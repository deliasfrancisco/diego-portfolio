'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { OWNER } from '@/data/content'
import SectionHeader from '@/components/ui/SectionHeader'
import TerminalWindow from '@/components/ui/TerminalWindow'
import Cursor from '@/components/ui/Cursor'
import GitHubHeatmap from '@/components/ui/GitHubHeatmap'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-[42px] px-5 md:px-[38px]">
      <SectionHeader command="# About.system" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        {/* Two-column grid */}
        <div className="grid gap-[22px] grid-cols-1 md:grid-cols-[220px_1fr]">
          {/* Left — System Card */}
          <div className="bg-bg-card border border-bg-border rounded-lg p-5">
            {/* Avatar */}
            <div className="flex flex-col items-center mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-green font-mono text-xl font-bold text-green mb-2"
                style={{ background: 'rgba(34,197,94,0.08)' }}
              >
                {OWNER.initials}
              </div>
              <div className="font-mono text-[12px] text-[var(--tx)] text-center">{OWNER.name}</div>
            </div>
            {/* Info rows */}
            {[
              ['OPERATOR', OWNER.name],
              ['ROLE', 'Architect'],
              ['LOCATION', OWNER.location],
              ['STATUS', '● ONLINE'],
              ['MBA', 'PUC Minas'],
              ['B.TECH', 'FATEC — ADS'],
            ].map(([label, val]) => (
              <div key={label} className="flex flex-col mb-3">
                <span className="font-mono text-[9px] text-[var(--dm)] uppercase tracking-wider">{label}</span>
                <span
                  className={`font-mono text-[11px] ${label === 'STATUS' ? 'text-green-bright' : 'text-[var(--mu)]'}`}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Right — Terminal */}
          <TerminalWindow title="user_profile.log">
            <div className="space-y-4">
              <div>
                <span className="text-green">➜</span>
                <span className="text-[var(--tx)]"> whoami</span>
                <p className="mt-1 text-[var(--mu)] leading-5">
                  Senior .NET Full-Stack Architect with 7+ years of experience
                  <br />building enterprise systems. Passionate about distributed
                  <br />architecture, clean code, and legacy modernization.
                </p>
              </div>
              <div>
                <span className="text-green">➜</span>
                <span className="text-[var(--tx)]"> cat mission.txt</span>
                <p className="mt-1 text-[var(--mu)] leading-5">
                  Translating complex business requirements into robust .NET
                  <br />solutions. Currently refactoring the{' '}
                  <span className="text-[#82aaff]">Nexus</span> automotive port
                  <br />management platform. Open to global freelance on Upwork.
                </p>
              </div>
              <div>
                <span className="text-green">➜</span>
                <span className="text-[var(--tx)]"> </span>
                <Cursor />
              </div>
            </div>
          </TerminalWindow>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            ['7+', 'YEARS XP'],
            ['MBA', 'PUC MINAS'],
            ['∞', 'COMMITS'],
          ].map(([val, label]) => (
            <div key={label} className="bg-bg-card border border-bg-border rounded-lg p-4 text-center">
              <div className="font-mono text-2xl text-green font-bold">{val}</div>
              <div className="font-mono text-[10px] text-[var(--dm)] uppercase tracking-wider mt-1">{label}</div>
            </div>
          ))}
        </div>

        <GitHubHeatmap />
      </motion.div>
    </section>
  )
}
