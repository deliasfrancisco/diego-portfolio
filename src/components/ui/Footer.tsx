'use client'
import { useLang } from '@/contexts/LangContext'
import { T } from '@/data/translations'

export default function Footer() {
  const { lang } = useLang()
  const t        = T[lang]

  return (
    <footer className="border-t border-bg-border">
      <div className="w-full max-w-[1280px] mx-auto px-5 md:px-12 py-6 md:py-4 text-center font-mono text-[10px] text-dim">
        Built with Next.js · TypeScript · Tailwind · {'// Diego Francisco © 2026'}
        <div className="mt-1 opacity-50">{t.footer.keys}</div>
      </div>
    </footer>
  )
}
