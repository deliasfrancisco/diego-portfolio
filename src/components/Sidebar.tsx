'use client'
import { useState } from 'react'
import Image from 'next/image'
import profile from '@/assets/img/profile_1.jpg'
import { useActiveSection } from '@/hooks/useActiveSection'
import { OWNER } from '@/data/content'
import { useLang } from '@/contexts/LangContext'
import { T } from '@/data/translations'

const NAV_IDS = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'] as const

function scrollTo(id: string, close?: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  close?.()
}

export default function Sidebar() {
  const activeId        = useActiveSection([...NAV_IDS])
  const [open, setOpen] = useState(false)
  const { lang }        = useLang()
  const t               = T[lang]

  const NAV = [
    { id: 'hero',       label: t.nav.home       },
    { id: 'about',      label: t.nav.about      },
    { id: 'skills',     label: t.nav.skills     },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects',   label: t.nav.projects   },
    { id: 'contact',    label: t.nav.contact    },
  ]

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="fixed top-4 right-4 z-[70] md:hidden bg-bg-card border border-bg-border rounded p-2 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <div className={`w-4 h-[2px] bg-green transition-all duration-200 ${open ? 'translate-y-[5px] rotate-45' : ''}`} />
        <div className={`w-4 h-[2px] bg-green my-[3px] transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <div className={`w-4 h-[2px] bg-green transition-all duration-200 ${open ? '-translate-y-[5px] -rotate-45' : ''}`} />
      </button>

      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed left-0 top-0 h-screen flex flex-col z-[65] border-r border-bg-border
          transition-transform duration-300 ease-in-out
          w-[min(240px,80vw)] md:w-[168px]
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{ background: '#050a06' }}
      >
        {/* Header */}
        <div className="p-4 border-b border-bg-border">
          <div className="flex justify-center mb-3">
            <div className="rounded-full border-2 border-green p-[2px]">
              <Image
                src={profile}
                alt={OWNER.name}
                width={64}
                height={64}
                className="rounded-full object-cover w-16 h-16"
                priority
              />
            </div>
          </div>
          <div className="font-mono text-[10px] text-[var(--mu)] mb-1">{OWNER.name}</div>
          <div className="font-mono text-[11px] text-green font-medium">:: v7.0.0 LIVE</div>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-green animate-pulsar" />
            <span className="font-mono text-[9px] text-[var(--dm)] uppercase tracking-wider">Deployed</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 flex flex-col gap-1">
          {NAV.map(({ id, label }) => {
            const isActive = activeId === id
            return (
              <button
                key={id}
                onClick={() => scrollTo(id, () => setOpen(false))}
                className={`
                  flex items-center gap-2 px-4 py-2 text-left font-mono text-[12px] w-full
                  transition-colors duration-150 cursor-pointer
                  ${isActive
                    ? 'text-green-bright border-l-2 border-green pl-[14px]'
                    : 'text-[var(--mu)] hover:text-green border-l-2 border-transparent'}
                `}
              >
                <span className="text-green-dark">&gt;</span>
                {label}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-bg-border">
          <div className="font-mono text-[9px] text-[var(--dm)] mb-1">{t.nav.availability}</div>
          <div className="font-mono text-[10px] text-green">OPEN_TO_FREELANCE</div>
          <div className="font-mono text-[9px] text-[var(--mu)] mt-1">
            upwork: <span className="text-green">●</span> active
          </div>
        </div>
      </aside>
    </>
  )
}
