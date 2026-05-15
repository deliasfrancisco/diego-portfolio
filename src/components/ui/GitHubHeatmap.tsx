'use client'
import { useState, useEffect } from 'react'

const WEEKS = 52
const DAYS  = 7

function srand(seed: number) {
  const s = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return s - Math.floor(s)
}

function generateMock() {
  const today = new Date()
  const grid: { count: number; date: Date }[][] = []

  for (let w = 0; w < WEEKS; w++) {
    const week: { count: number; date: Date }[] = []
    for (let d = 0; d < DAYS; d++) {
      const daysAgo = (WEEKS - 1 - w) * 7 + (DAYS - 1 - d)
      const date = new Date(today)
      date.setDate(date.getDate() - daysAgo)

      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      const recency   = Math.max(0, 1 - (daysAgo / 30) / 7)
      const r  = srand(w * 7 + d)
      const r2 = srand(w * 7 + d + 100)

      let count = 0
      const prob = (isWeekend ? 0.3 : 0.68) + recency * 0.18

      if (r < prob) {
        if (isWeekend) {
          count = Math.floor(r2 * 3) + 1
        } else {
          const t = srand(w * 7 + d + 200)
          if (t < 0.40) count = Math.floor(r2 * 2) + 1
          else if (t < 0.70) count = Math.floor(r2 * 3) + 3
          else if (t < 0.90) count = Math.floor(r2 * 4) + 6
          else               count = Math.floor(r2 * 5) + 10
        }
        if (recency > 0.6 && srand(w * 7 + d + 300) < 0.12) count = Math.min(count + 5, 15)
      }

      week.push({ count, date })
    }
    grid.push(week)
  }
  return grid
}

function cellColor(n: number) {
  if (n === 0)  return '#0c1410'
  if (n <= 2)   return '#0f4a26'
  if (n <= 5)   return '#166534'
  if (n <= 9)   return '#22c55e'
  return '#4ade80'
}

function fmt(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

type Cell = { count: number; date: Date }

export default function GitHubHeatmap() {
  const [grid, setGrid]   = useState<Cell[][]>([])
  const [live, setLive]   = useState(false)
  const [tip,  setTip]    = useState<{ count: number; date: Date; x: number; y: number } | null>(null)
  const year              = new Date().getFullYear()

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/contributions')
        if (!res.ok) throw new Error()
        const { weeks } = await res.json() as {
          weeks: { contributionDays: { contributionCount: number; date: string }[] }[]
        }

        const parsed: Cell[][] = weeks.map((w) =>
          w.contributionDays.map((d) => ({
            count: d.contributionCount,
            date:  new Date(d.date + 'T12:00:00'),
          }))
        )
        setGrid(parsed)
        setLive(true)
      } catch {
        setGrid(generateMock())
      }
    }

    load()
  }, [])

  if (!grid.length) {
    return <div className="mt-6 h-[130px] rounded-lg bg-bg-card border border-bg-border animate-pulse" />
  }

  return (
    <div className="mt-6">
      <div className="font-mono text-[10px] text-[var(--dm)] mb-2 flex items-center gap-2">
        {'// '}{year}{' contribution activity'}
        {live && <span className="text-green">● live</span>}
      </div>
      <div
        className="relative rounded-lg border border-bg-border p-4 overflow-x-auto"
        style={{ background: '#0c1410' }}
      >
        <div className="flex gap-[2px]" style={{ width: 'max-content' }}>
          {grid.map((week, w) => (
            <div key={w} className="flex flex-col gap-[2px]">
              {week.map((cell, d) => (
                <div
                  key={d}
                  className="w-[13px] h-[13px] rounded-[3px] cursor-pointer transition-opacity duration-100 hover:opacity-70"
                  style={{ background: cellColor(cell.count) }}
                  onMouseEnter={(e) => {
                    const r  = e.currentTarget.getBoundingClientRect()
                    const pr = e.currentTarget.closest('.relative')?.getBoundingClientRect()
                    if (pr) setTip({ ...cell, x: r.left - pr.left + r.width / 2, y: r.top - pr.top })
                  }}
                  onMouseLeave={() => setTip(null)}
                />
              ))}
            </div>
          ))}
        </div>

        {tip && (
          <div
            className="absolute z-10 pointer-events-none font-mono text-[10px] bg-bg-deep border border-bg-border rounded px-2 py-1 text-[var(--mu)] whitespace-nowrap"
            style={{ left: tip.x, top: tip.y - 8, transform: 'translate(-50%, -100%)' }}
          >
            {fmt(tip.date)} · <span className="text-green">{tip.count} commit{tip.count !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  )
}
