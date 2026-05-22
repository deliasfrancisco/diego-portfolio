'use client'
import { useRef, useState, useEffect } from 'react'
import { VscHome, VscAccount, VscCode, VscGitCommit, VscFolder, VscMail } from 'react-icons/vsc'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useLang } from '@/contexts/LangContext'
import { T } from '@/data/translations'

const SECTIONS = [
  { id: 'hero',       Icon: VscHome      },
  { id: 'about',      Icon: VscAccount   },
  { id: 'skills',     Icon: VscCode      },
  { id: 'experience', Icon: VscGitCommit },
  { id: 'projects',   Icon: VscFolder    },
  { id: 'contact',    Icon: VscMail      },
] as const

type SectionId = typeof SECTIONS[number]['id']

function scrollTo(id: string, cb?: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  cb?.()
}

export default function NavIndicator() {
  const activeId    = useActiveSection(SECTIONS.map(s => s.id) as unknown as SectionId[])
  const [open, setOpen] = useState(false)
  const { lang }    = useLang()
  const t           = T[lang]
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRefs    = useRef<(HTMLButtonElement | null)[]>([])
  const [dotY, setDotY] = useState<number | null>(null)

  const labels = [
    t.nav.home, t.nav.about, t.nav.skills,
    t.nav.experience, t.nav.projects, t.nav.contact,
  ]

  useEffect(() => {
    const idx = SECTIONS.findIndex(s => s.id === activeId)
    const btn = iconRefs.current[idx]
    const container = containerRef.current
    if (!btn || !container) return
    setTimeout(() => {
      const btnRect = btn.getBoundingClientRect()
      const cRect   = container.getBoundingClientRect()
      setDotY(btnRect.top - cRect.top + btnRect.height / 2)
    }, 0)
  }, [activeId])

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-4 right-4 z-[70] md:hidden bg-bg-card border border-bg-border rounded p-2 cursor-pointer"
        onClick={() => setOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <div className={`w-4 h-[2px] bg-green transition-all duration-200 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
        <div className={`w-4 h-[2px] bg-green my-[3px] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <div className={`w-4 h-[2px] bg-green transition-all duration-200 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
      </button>

      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-black/60 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed left-0 top-0 h-screen z-[65] flex flex-col border-r border-bg-border transition-transform duration-300 ease-in-out md:hidden w-[min(240px,80vw)] bg-bg-deep ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="px-4 py-3 border-b border-bg-border font-mono text-[11px] text-green tracking-wider">
          MENU
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1">
          {SECTIONS.map(({ id, Icon }, i) => (
            <button
              key={id}
              onClick={() => scrollTo(id, () => setOpen(false))}
              className={`flex items-center gap-3 px-4 py-2.5 font-mono text-[12px] w-full transition-colors duration-150 cursor-pointer border-l-2 ${
                activeId === id
                  ? 'text-green border-green pl-[14px]'
                  : 'text-[var(--mu)] hover:text-green border-transparent'
              }`}
            >
              <Icon size={14} />
              {labels[i]}
            </button>
          ))}
        </nav>
      </div>

      {/* Desktop vertical indicator — fixed, transparent, floats over page */}
      <div
        ref={containerRef}
        className="fixed left-0 top-0 h-screen w-16 z-[65] hidden md:block pointer-events-none"
      >
        {/* Vertical line */}
        <div className="absolute top-20 bottom-20 left-[31px] w-[1px] bg-green-dark" />

        {/* Scroll dot */}
        {dotY !== null && (
          <div
            className="absolute left-[27px] w-2 h-2 rounded-full bg-green transition-all duration-300 ease-out"
            style={{ top: dotY - 4 }}
          />
        )}

        {/* Section icons — re-enable pointer events for clicks */}
        <div className="pointer-events-auto flex flex-col justify-around h-full py-20 items-center">
          {SECTIONS.map(({ id, Icon }, i) => (
            <button
              key={id}
              ref={el => { iconRefs.current[i] = el }}
              onClick={() => scrollTo(id)}
              aria-label={labels[i]}
              className="group relative flex items-center justify-center p-2 cursor-pointer"
            >
              <Icon
                size={15}
                className={`transition-colors duration-150 ${
                  activeId === id ? 'text-green' : 'text-green-dark group-hover:text-green'
                }`}
              />
              <span className="absolute left-9 whitespace-nowrap font-mono text-[10px] bg-bg-card border border-bg-border rounded px-2 py-1 text-[var(--mu)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
                {labels[i]}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
