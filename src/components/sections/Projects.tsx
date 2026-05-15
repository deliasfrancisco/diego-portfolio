'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROJECTS } from '@/data/content'
import SectionHeader from '@/components/ui/SectionHeader'
import { useLang } from '@/contexts/LangContext'

export default function Projects() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { lang } = useLang()

  return (
    <section className="grid-bg py-8 md:py-[42px] px-5 md:px-[38px]">
      <SectionHeader command="$ ls -la ~/projects" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(210px,1fr))]"
      >
        {PROJECTS.map((project) => (
          <div
            key={project.name}
            className="bg-bg-card border border-bg-border rounded-lg p-4 flex flex-col gap-2 transition-colors duration-150 hover:border-green-dark"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[12px]" style={{ color: '#82aaff' }}>
                {project.name}
              </span>
              <span
                className="font-mono text-[9px] px-2 py-0.5 rounded border border-bg-border"
                style={{ color: 'var(--dm)' }}
              >
                {project.badge}
              </span>
            </div>

            {/* Description */}
            <p className="text-[12px] text-[var(--mu)] leading-5 flex-1">{lang === 'pt' ? project.descPt : project.desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                  style={{ color: 'var(--dm)', background: 'rgba(255,255,255,0.03)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between font-mono text-[10px] pt-1 border-t border-bg-border">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: project.langColor }}
                />
                <span style={{ color: 'var(--mu)' }}>{project.lang}</span>
              </div>
              <span style={{ color: 'var(--dm)' }}>{project.meta}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
