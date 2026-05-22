'use client'

import dynamic from 'next/dynamic'
import { OWNER } from '@/data/content'

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then(m => m.GitHubCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="h-[120px] rounded-lg bg-bg-card animate-pulse" />
    ),
  }
)

const TERMINAL_THEME = {
  light: ['#1c2e1e', '#0f4a26', '#166534', '#22c55e', '#4ade80'],
  dark:  ['#1c2e1e', '#0f4a26', '#166534', '#22c55e', '#4ade80'],
}

interface Props {
  username?: string
}

export default function GitHubHeatmap({ username: usernameProp }: Props) {
  const username =
    usernameProp ??
    OWNER.github?.split('/').filter(Boolean).pop() ??
    'deliasfrancisco'

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3 font-mono text-[10px] tracking-wider">
        <span className="text-[var(--dm)]">$</span>
        <span className="text-[var(--gb)]">git log</span>
        <span className="text-[var(--dm)]">--graph --since=&quot;1 year ago&quot; --author=</span>
        <span className="text-[var(--g)]">{username}</span>
      </div>

      <div className="bg-[var(--bg-card)] border border-[var(--bdr)] rounded-lg p-4 overflow-x-auto flex justify-center">
        <GitHubCalendar
          username={username}
          theme={TERMINAL_THEME}
          colorScheme="dark"
          fontSize={11}
          blockSize={11}
          blockMargin={3}
          blockRadius={2}
          showColorLegend
          showMonthLabels
          showTotalCount
          labels={{
            totalCount: '{{count}} contributions in the last year',
            legend: {
              less: 'less',
              more: 'more',
            },
          }}
          style={{
            color: 'var(--mu)',
            fontFamily: "'JetBrains Mono', monospace",
          }}
          errorMessage="// fetch failed — GitHub data unavailable"
        />
      </div>

      <div className="mt-2 font-mono text-[10px] text-[var(--dm)]">
        {'// synced from '}
        <span className="text-[var(--gb)]">github.com/{username}</span>
      </div>
    </div>
  )
}
