'use client'
import { useLang } from '@/contexts/LangContext'
import { T } from '@/data/translations'

export default function Footer() {
  const { lang } = useLang()
  const t        = T[lang]

  return (
    <footer
      className="py-6 md:py-4 px-5 md:px-12 text-center font-mono text-[10px] border-t border-bg-border"
      style={{ color: 'var(--dm)' }}
    >
      Built with Next.js · TypeScript · Tailwind · {'// Diego Francisco © 2026'}
      <div className="mt-1 opacity-50">{t.footer.keys}</div>
    </footer>
  )
}
