'use client'
import { ReactNode } from 'react'

interface CodeEditorProps {
  filename: string
  children: ReactNode
  runLabel?: string
  onRun?: () => void
}

export default function CodeEditor({ filename, children, runLabel = '▶ Run', onRun }: CodeEditorProps) {
  return (
    <div className="w-full max-w-full min-w-0 rounded-lg overflow-hidden border border-bg-border flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 bg-bg-card border-b border-bg-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex gap-1.5 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span
            className="font-mono text-[11px] text-[var(--tx)] px-3 py-0.5 border-b-2 truncate"
            style={{ borderColor: '#22c55e' }}
          >
            {filename}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-x-auto min-w-0" style={{ background: '#030808' }}>
        <div className="p-4 font-mono text-xs leading-6 w-max min-w-full">{children}</div>
      </div>
      {(runLabel || onRun) && (
        <div className="flex flex-wrap items-center gap-2 px-3 py-2 bg-bg-card border-t border-bg-border">
          <span className="font-mono text-[10px] text-[var(--dm)]">OUTPUT</span>
          <button
            onClick={onRun}
            className="ml-auto font-mono text-[11px] px-3 py-1 rounded bg-green text-bg-deep font-medium hover:bg-green-bright transition-colors duration-150 cursor-pointer"
          >
            {runLabel}
          </button>
        </div>
      )}
    </div>
  )
}
