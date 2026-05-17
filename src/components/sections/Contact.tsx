'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FaLinkedinIn, FaGithub, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { OWNER } from '@/data/content'
import SectionHeader from '@/components/ui/SectionHeader'
import Cursor from '@/components/ui/Cursor'
import { useLang } from '@/contexts/LangContext'
import { T } from '@/data/translations'

interface Channel {
  icon:   IconType
  label:  string
  handle: string
  href:   string
  color:  string
}

const CHANNELS: Channel[] = [
  {
    icon:   FaLinkedinIn,
    label:  'LinkedIn',
    handle: '/in/deliasfrancisco',
    href:   OWNER.linkedin,
    color:  '#0A66C2',
  },
  {
    icon:   FaGithub,
    label:  'GitHub',
    handle: '@deliasfrancisco',
    href:   OWNER.github,
    color:  '#e2e8f0',
  },
  {
    icon:   FaWhatsapp,
    label:  'WhatsApp',
    handle: '+55 18 98148-5074',
    href:   `https://wa.me/${OWNER.whatsapp}`,
    color:  '#25D366',
  },
  {
    icon:   FaEnvelope,
    label:  'E-mail',
    handle: OWNER.emailSocial,
    href:   `mailto:${OWNER.emailSocial}`,
    color:  '#22c55e',
  },
]

export default function Contact() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { lang } = useLang()
  const t        = T[lang].contact

  return (
    <section className="grid-bg py-8 md:py-[42px] px-5 md:px-[38px]">
      <SectionHeader command="$ ./contact.exe" />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="grid gap-[18px] grid-cols-1 md:grid-cols-2"
      >
        {/* Left — JSON viewer */}
        <div className="min-w-0 w-full rounded-lg overflow-hidden border border-bg-border">
          <div className="flex items-center gap-2 px-3 py-2 bg-bg-card border-b border-bg-border">
            <span className="w-2 h-2 rounded-full bg-green shrink-0" />
            <span className="font-mono text-[11px] text-[var(--mu)] wrap-anywhere">appsettings.contact.json</span>
          </div>
          <div className="p-3 md:p-4 font-mono text-[11px] md:text-[12px] leading-6 overflow-x-auto" style={{ background: '#030808' }}>
            <span className="j-bkt">{'{'}</span>
            <br />
            {[
              ['status',   'open_to_freelance'],
              ['name',     OWNER.name],
              ['location', 'Presidente Prudente, BR'],
              ['timezone', OWNER.timezone],
              ['upwork',   OWNER.upwork],
              ['linkedin', '/in/deliasfrancisco'],
              ['github',   '@deliasfrancisco'],
              ['response', 'within_24h'],
            ].map(([key, val]) => (
              <div key={key} className="ml-4">
                <span className="j-key">&quot;{key}&quot;</span>
                <span className="j-bkt">: </span>
                <span className="j-val">&quot;{val}&quot;</span>
                <span className="j-bkt">,</span>
              </div>
            ))}
            <span className="j-bkt">{'}'}</span>
            <br />
            <span className="j-cmt">{t.waitingConn}</span>{' '}
            <Cursor />
          </div>
        </div>

        {/* Right — Connect channels */}
        <div className="min-w-0 w-full rounded-lg overflow-hidden border border-bg-border flex flex-col">
          <div className="flex items-center gap-2 px-3 py-2 bg-bg-card border-b border-bg-border">
            <span className="w-2 h-2 rounded-full bg-green-dark shrink-0" />
            <span className="font-mono text-[11px] text-[var(--mu)]">connect.sh</span>
          </div>

          <div className="flex flex-col flex-1 p-4 gap-3" style={{ background: '#030808' }}>
            <p className="font-mono text-[10px] text-[var(--dm)]">{t.channels}</p>

            <div className="flex flex-col gap-2">
              {CHANNELS.map(({ icon: Icon, label, handle, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-4 py-3 rounded border border-bg-border transition-all duration-150 hover:border-green-dark"
                  style={{ background: 'rgba(12,20,16,0.6)' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(34,197,94,0.05)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(12,20,16,0.6)')}
                >
                  <Icon
                    size={16}
                    style={{ color, flexShrink: 0 }}
                    className="transition-transform duration-150 group-hover:scale-110"
                  />
                  <span className="font-mono text-[10px] text-[var(--dm)] w-[72px] shrink-0 uppercase tracking-wider">
                    {label}
                  </span>
                  <span className="font-mono text-[11px] text-[var(--mu)] flex-1 min-w-0 truncate group-hover:text-green transition-colors duration-150">
                    {handle}
                  </span>
                  <span className="font-mono text-[12px] text-[var(--dm)] group-hover:text-green transition-all duration-150 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              ))}
            </div>

            <p className="font-mono text-[10px] text-[var(--dm)] mt-auto pt-2">{t.responseTime}</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
