'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import SectionHeader from '@/components/ui/SectionHeader'
import { SKILLS } from '@/data/content'

/* ── distribute N items uniformly on a sphere via Fibonacci / golden spiral ── */
function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = phi * i
    points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius])
  }
  return points
}

const SkillsCanvas = dynamic(() => import('./SkillsCanvas'), { ssr: false })

export default function Skills() {
  const positions = fibonacciSphere(SKILLS.length, 3.5)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="grid-bg py-[42px] px-5 md:px-[38px]">
      <SectionHeader command="# Skills.json" />

      <div className="relative w-full h-[460px] border border-[var(--bdr)] rounded-lg overflow-hidden bg-[var(--bg-card)]">
        <SkillsCanvas
          skills={SKILLS}
          positions={positions}
          hovered={hovered}
          setHovered={setHovered}
        />

        {/* decorative wireframe ring */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[280px] h-[280px] rounded-full border border-[var(--gd)] opacity-20"
            style={{ borderStyle: 'dashed' }}
          />
        </div>

        {/* hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[var(--dm)] tracking-wider pointer-events-none whitespace-nowrap">
          {'⟳ drag to rotate · hover to highlight · auto-rotation active'}
        </div>
      </div>
    </section>
  )
}
