'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { EXPERIENCE, INITIAL_COMMIT } from '@/data/content'
import SectionHeader from '@/components/ui/SectionHeader'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-[42px] px-5 md:px-[38px]">
      <SectionHeader command="$ git log --stat --oneline" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="flex flex-col gap-0"
      >
        {EXPERIENCE.map((entry, i) => (
          <div key={entry.hash} className="grid gap-4 relative grid-cols-1 md:grid-cols-[150px_1fr]">
            {/* Vertical connector line — desktop only */}
            {i < EXPERIENCE.length - 1 && (
              <div
                className="hidden md:block absolute left-[75px] top-6 w-px bg-bg-border"
                style={{ height: 'calc(100% + 24px)' }}
              />
            )}

            {/* Left — commit meta */}
            <div className="pt-1 md:pr-4 md:text-right relative z-10 flex md:flex-col gap-2 md:gap-0">
              <div className="font-mono text-[11px]" style={{ color: '#f78c6c' }}>{entry.hash}</div>
              <div className="font-mono text-[10px] text-green leading-4">{entry.branch}</div>
              {entry.remote && (
                <div className="font-mono text-[9px] text-[var(--dm)]">{entry.remote}</div>
              )}
              {/* Dot — desktop only */}
              <div className="hidden md:block absolute right-[-5px] top-[6px] w-[9px] h-[9px] rounded-full bg-green border-2 border-bg" />
            </div>

            {/* Right — commit body */}
            <div className="bg-bg-card border border-bg-border rounded-lg p-4 mb-6">
              <div className="font-mono text-[9px] text-[var(--dm)] uppercase tracking-wider mb-1">{entry.period}</div>
              <div className="text-[13px] font-medium text-[var(--tx)] mb-0.5">{entry.role}</div>
              <div className="font-mono text-[11px] text-green-bright mb-2">{entry.company}</div>
              <p className="text-[12px] text-[var(--mu)] leading-5 mb-3">{entry.desc}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-0.5 rounded border border-green-dim"
                    style={{ color: 'var(--mu)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="font-mono text-[10px] flex gap-3" style={{ color: 'var(--dm)' }}>
                <span>files changed</span>
                <span className="text-green">+{entry.insertions}</span>
                <span style={{ color: '#f07178' }}>-{entry.deletions}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Initial commit */}
        <div className="font-mono text-[11px] flex gap-3 items-center pt-2 px-2">
          <span style={{ color: '#f78c6c' }}>{INITIAL_COMMIT.hash}</span>
          <span className="text-[var(--mu)]">{INITIAL_COMMIT.msg}</span>
          <span className="ml-auto text-[var(--dm)]">{INITIAL_COMMIT.year}</span>
        </div>
      </motion.div>
    </section>
  )
}
