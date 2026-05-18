'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import SectionHeader from '@/components/ui/SectionHeader'
import { SKILLS } from '@/data/content'

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
  const [hovered, setHovered]   = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const positions = fibonacciSphere(SKILLS.length, isMobile ? 3.6 : 4.4)

  return (
    <section className="grid-bg py-8 md:py-[42px] px-5 md:px-[38px]">
      <SectionHeader command="# Skills.json" />

      <div className="relative w-full max-w-full min-w-0 h-[340px] sm:h-[420px] md:h-[500px] overflow-hidden">
        <SkillsCanvas
          skills={SKILLS}
          positions={positions}
          hovered={hovered}
          setHovered={setHovered}
          isMobile={isMobile}
        />

        {/* hint — backdrop so text stays readable over rotating wireframe */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-[var(--dm)] tracking-wider pointer-events-none whitespace-nowrap px-3 py-1 rounded bg-bg-dim">
          {'⟳ drag to rotate · hover to highlight'}
        </div>
      </div>
    </section>
  )
}
