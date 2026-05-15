'use client'

import { useTypewriter } from '@/hooks/useTypewriter'
import { OWNER, LOADED_MODULES, C_SHARP_SNIPPET } from '@/data/content'
import Cursor from '@/components/ui/Cursor'
import CodeEditor from '@/components/ui/CodeEditor'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const CS_KEYWORDS = new Set(['public', 'class', 'new', 'true', 'false', 'return'])
const CS_TYPES    = new Set(['string', 'int', 'bool', 'Architect', 'IFreelancer'])
const CS_PROPS    = new Set(['Name', 'Role', 'MBA', 'YearsXp', 'Stack', 'Available'])
const CS_TOKEN    = /("(?:[^"\\]|\\.)*")|([a-zA-Z_]\w*)|(=>|\[\]|=)|(\d+)/g

function escHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function highlightCSharp(line: string): string {
  if (line.trim().startsWith('//')) {
    return `<span class="cs-cm">${escHtml(line)}</span>`
  }
  let result = ''
  let lastIndex = 0
  CS_TOKEN.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = CS_TOKEN.exec(line)) !== null) {
    if (m.index > lastIndex) result += escHtml(line.slice(lastIndex, m.index))
    const [, strLit, ident, op, num] = m
    if (strLit !== undefined) {
      result += `<span class="cs-st">${escHtml(strLit)}</span>`
    } else if (ident !== undefined) {
      if (CS_KEYWORDS.has(ident))      result += `<span class="cs-kw">${ident}</span>`
      else if (CS_TYPES.has(ident))    result += `<span class="cs-ty">${ident}</span>`
      else if (CS_PROPS.has(ident))    result += `<span class="cs-pr">${ident}</span>`
      else                             result += ident
    } else if (op !== undefined) {
      result += `<span class="cs-op">${escHtml(op)}</span>`
    } else if (num !== undefined) {
      result += `<span class="cs-nm">${num}</span>`
    }
    lastIndex = CS_TOKEN.lastIndex
  }
  if (lastIndex < line.length) result += escHtml(line.slice(lastIndex))
  return result
}

function HighlightedSnippet({ code }: { code: string }) {
  const lines = code.split('\n')
  return (
    <div className="text-[11px] leading-5">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="w-8 text-right text-[var(--dm)] select-none mr-4 shrink-0">{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: highlightCSharp(line) }} />
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  const { displayText, isDone } = useTypewriter(`Hello, I'm ${OWNER.name}`, 55, 400)

  return (
    <div className="grid-bg min-h-screen flex items-center px-5 md:px-[38px] lg:px-12 py-16">
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT — text content */}
          <div className="flex flex-col gap-5">
            {/* kernel badge */}
            <div>
              <div className="kernel-badge">
                <span className="dot" />
                <span>{OWNER.kernel} LIVE</span>
              </div>
            </div>

            {/* tag prefix */}
            <div className="font-mono text-[10px] text-[var(--dm)] tracking-wider">
              {'< Dev/>'}{'  <System.Init />  while(alive) { code(); }'}
            </div>

            {/* headline */}
            <h1 className="text-[36px] lg:text-[52px] font-medium leading-[1.05] text-[var(--tx)] min-h-[44px] font-sans">
              {displayText}
              {isDone && <Cursor />}
            </h1>

            {/* role tag */}
            <div className="font-mono text-xl text-green">
              {'<SoftwareArchitect />'}
            </div>

            {/* subtitle */}
            <p className="text-[15px] text-[var(--mu)] leading-relaxed max-w-[460px]">
              Senior .NET Full-Stack Architect specializing in distributed systems,
              enterprise refactoring, and scalable APIs. 7+ years building production
              platforms across .NET, Angular, and SQL Server.
            </p>

            {/* loaded modules pills */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="font-mono text-[9px] text-[var(--dm)] tracking-wider mr-2">
                LOADED_MODULES:
              </span>
              {LOADED_MODULES.map(mod => (
                <span
                  key={mod}
                  className="font-mono text-[9px] px-2 py-1 border border-[var(--gd)] rounded text-green-bright"
                  style={{ background: 'rgba(34,197,94,0.04)' }}
                >
                  {mod}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={() => scrollTo('projects')}
                className="font-mono text-[12px] px-5 py-3 bg-green text-bg-deep rounded transition-colors hover:bg-green-bright flex items-center gap-2 cursor-pointer"
              >
                <span>▶</span>
                $ dotnet run portfolio
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="font-mono text-[12px] px-5 py-3 bg-transparent text-green border border-[var(--gd)] rounded transition-all hover:border-green cursor-pointer"
                style={{ ['--tw-bg-opacity' as string]: undefined }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(34,197,94,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                send message →
              </button>
            </div>
          </div>

          {/* RIGHT — code editor */}
          <div className="w-full">
            <CodeEditor
              filename="Diego.cs"
              runLabel="▶ Run Contact.exe"
              onRun={() => scrollTo('contact')}
            >
              <HighlightedSnippet code={C_SHARP_SNIPPET} />
            </CodeEditor>
          </div>

        </div>
      </div>
    </div>
  )
}
