import { ReactNode } from 'react'

interface TerminalWindowProps {
  title: string
  children: ReactNode
  className?: string
}

export default function TerminalWindow({ title, children, className = '' }: TerminalWindowProps) {
  return (
    <div className={`rounded-lg overflow-hidden border border-bg-border ${className}`}>
      <div className="flex items-center gap-2 px-3 py-2 bg-bg-card border-b border-bg-border">
        <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-[11px] text-[var(--mu)]">{title}</span>
      </div>
      <div
        className="p-4 font-mono text-xs text-[var(--mu)] leading-relaxed overflow-x-auto"
        style={{ background: '#030808' }}
      >
        {children}
      </div>
    </div>
  )
}
