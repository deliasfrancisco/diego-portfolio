'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { OWNER } from '@/data/content'
import { sendEmail } from '@/lib/email'
import SectionHeader from '@/components/ui/SectionHeader'
import Cursor from '@/components/ui/Cursor'
import { useLang } from '@/contexts/LangContext'
import { T } from '@/data/translations'

type Status = 'idle' | 'sending' | 'success' | 'error'

const INPUT_CLASS =
  'w-full min-w-0 bg-[#030808] border border-bg-border rounded px-3 py-2 font-mono text-[12px] text-[var(--tx)] outline-none focus:border-green-dark transition-colors duration-150'

export default function Contact() {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const { lang } = useLang()
  const t        = T[lang].contact

  const [status,  setStatus]  = useState<Status>('idle')
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      await sendEmail(name, email, message)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const btnColor =
    status === 'success' ? 'bg-green-dark text-green cursor-default'
    : status === 'error' ? 'bg-[#3a0f0f] text-[#f07178] cursor-default'
    : 'bg-green text-bg-deep hover:bg-green-bright cursor-pointer'

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
              ['linkedin', '/in/diego-francisco'],
              ['github',   '@diegofrancisco'],
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

        {/* Right — Form */}
        <div className="min-w-0 w-full rounded-lg overflow-hidden border border-bg-border">
          <div className="flex items-center justify-between px-3 py-2 bg-bg-card border-b border-bg-border">
            <span className="font-mono text-[11px] text-[var(--mu)]">SendMessage.cs</span>
            <span className="font-mono text-[10px] text-[var(--dm)]">× close</span>
          </div>
          <div className="p-4" style={{ background: '#030808' }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <p className="font-mono text-[10px]" style={{ color: 'var(--dm)' }}>
                {t.compose}
              </p>
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[10px] text-[var(--dm)]">{t.labelName}</label>
                <input
                  type="text"
                  required
                  placeholder={t.placeholderName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={status === 'sending' || status === 'success'}
                  className={INPUT_CLASS}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[10px] text-[var(--dm)]">{t.labelEmail}</label>
                <input
                  type="email"
                  required
                  placeholder={t.placeholderEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'sending' || status === 'success'}
                  className={INPUT_CLASS}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-mono text-[10px] text-[var(--dm)]">{t.labelMessage}</label>
                <textarea
                  required
                  rows={4}
                  placeholder={t.placeholderMessage}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === 'sending' || status === 'success'}
                  className={INPUT_CLASS + ' resize-none'}
                />
              </div>
              <p className="font-mono text-[10px]" style={{ color: 'var(--dm)' }}>
                {t.responseNote}
              </p>
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`font-mono text-[11px] px-4 py-3 md:py-2.5 rounded font-medium transition-colors duration-150 w-full ${btnColor}`}
              >
                {t.btns[status]}
              </button>
              {status === 'error' && (
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="font-mono text-[10px] text-[var(--dm)] hover:text-[var(--mu)] transition-colors"
                >
                  {t.tryAgain}
                </button>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
