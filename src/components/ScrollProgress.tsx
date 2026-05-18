'use client'

import { useEffect, useState } from 'react'
import { Home, User, Code2, Briefcase, FolderGit2, Mail } from 'lucide-react'

interface SectionMeta {
  id: string
  label: string
  Icon: React.ComponentType<{ size?: number; className?: string }>
}

const SECTIONS: SectionMeta[] = [
  { id: 'hero',       label: 'Home',       Icon: Home },
  { id: 'about',      label: 'About',      Icon: User },
  { id: 'skills',     label: 'Skills',     Icon: Code2 },
  { id: 'experience', label: 'Experience', Icon: Briefcase },
  { id: 'projects',   label: 'Projects',   Icon: FolderGit2 },
  { id: 'contact',    label: 'Contact',    Icon: Mail },
]

export default function ScrollProgress() {
  const [active, setActive] = useState<string>('hero')
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const onScroll = () => {
      // page scroll percentage (0 → 100)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, scrolled)))

      // active section (whichever section's top is closest to viewport top with buffer)
      const buffer = window.innerHeight * 0.35
      let current = 'hero'
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.offsetTop - buffer <= window.scrollY) {
          current = id
        }
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside
      className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 pointer-events-none flex-col items-center"
      aria-label="Page sections navigation"
    >
      {/* track + progress + dots */}
      <div className="relative w-px h-[64vh] bg-[var(--bdr)]">
        {/* progress fill */}
        <div
          className="absolute top-0 left-0 w-px bg-[var(--g)] transition-[height] duration-150 ease-out"
          style={{ height: `${progress}%` }}
          aria-hidden="true"
        />

        {/* section markers */}
        {SECTIONS.map(({ id, label, Icon }, i) => {
          const position = (i / (SECTIONS.length - 1)) * 100
          const isActive = active === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => scrollTo(id)}
              aria-label={`Go to ${label}`}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto group focus:outline-none"
              style={{ top: `${position}%` }}
            >
              <div
                className={`
                  w-7 h-7 rounded-full border-2 flex items-center justify-center
                  transition-all duration-200 bg-[var(--bg)] border-[var(--g)]
                  ${isActive ? 'scale-110' : 'hover:scale-105'}
                `}
              >
                <Icon
                  size={12}
                  className="text-[var(--g)]"
                />
              </div>

              {/* tooltip — appears on hover, to the right of the dot */}
              <span
                className="
                  absolute left-10 top-1/2 -translate-y-1/2
                  px-2.5 py-1 rounded bg-[var(--bg-card)] border border-[var(--bdr)]
                  font-mono text-[10px] text-[var(--g)] whitespace-nowrap
                  opacity-0 group-hover:opacity-100 transition-opacity duration-150
                  pointer-events-none
                "
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </aside>
  )
}
