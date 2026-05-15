'use client'
import { useLang } from '@/contexts/LangContext'

export default function LangToggle() {
  const { lang, setLang } = useLang()

  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}
      className="fixed top-4 right-[52px] md:right-4 z-[60] font-mono text-[10px] px-2.5 py-1.5 bg-bg-card border border-bg-border rounded text-[var(--mu)] hover:text-green hover:border-green-dark transition-colors duration-150 cursor-pointer select-none"
      aria-label="Toggle language"
    >
      {lang === 'en' ? 'PT' : 'EN'}
    </button>
  )
}
