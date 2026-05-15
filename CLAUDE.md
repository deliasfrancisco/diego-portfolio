@AGENTS.md

# Diego Portfolio — Reference

## Stack
Next.js 16.2.6 · React 19.2.4 · TypeScript ^5 · Tailwind v4 · Framer Motion ^12.38.0 · JetBrains Mono · @emailjs/browser · three + @react-three/fiber + @react-three/drei · react-icons

> Tailwind v4: no `tailwind.config.js` — tokens in `globals.css` `@theme {}`.

## Files
```
src/app/
  globals.css       @theme + CSS vars + syntax classes + mobile guardrails (.grid-bg .kernel-badge .wrap-anywhere)
  layout.tsx        SEO metadata + Viewport export (prevents 980px phantom width)
  page.tsx          all sections + KernelBoot + KeyboardNav; main ml-0 md:ml-[168px]
  loading.tsx / robots.ts / sitemap.ts

src/components/
  Sidebar.tsx       fixed nav 168px; mobile: hamburger z-[70] md:hidden; aside w-[min(240px,80vw)] md:w-[168px]; CSS translate slide
  KeyboardNav.tsx   keys 1-6 → scroll to sections

  sections/
    Hero.tsx        2-col lg:grid-cols-2; mobile order: editor(order-1) → text(order-2); kernel-badge; grid-bg
    About.tsx       sys-card + TerminalWindow + stats + GitHubHeatmap; grid-bg
    Skills.tsx      3D sphere; isMobile state → radius 2.6/3.5 camera z12/9 fov60/50; dynamic(SkillsCanvas, ssr:false)
    SkillsCanvas.tsx Three.js Canvas; RotatingGroup useFrame; OrbitControls; Html distanceFactor=8
    Experience.tsx  git-log grid-cols-1 md:grid-cols-[150px_1fr]; grid-bg
    Projects.tsx    grid-cols-1 md:grid-cols-2 lg:auto-fit; grid-bg
    Contact.tsx     JSON viewer + EmailJS form 4 states; grid-bg

  ui/
    CodeEditor.tsx  overflow-x-auto body; w-max min-w-full inner; flex-wrap run bar
    TerminalWindow.tsx  overflow-x-auto body
    GitHubHeatmap.tsx   52×7 seeded mock; overflow-x-auto wrapper in About
    KernelBoot.tsx  sessionStorage guard; z-[200]
    SectionHeader / SectionReveal / Cursor
```

## Colors
| var | class | hex | use |
|-----|-------|-----|-----|
| `--bg` | `bg-bg` | `#070c08` | page bg |
| `--bg-card` | `bg-bg-card` | `#0c1410` | card bg |
| `--bg-deep` | `bg-bg-deep` | `#050a06` | sidebar/boot |
| `--bdr` | `border-bg-border` | `#1c2e1e` | border |
| `--g` | `text-green` | `#22c55e` | accent |
| `--gb` | `text-green-bright` | `#4ade80` | hover accent |
| `--gd` | `text-green-dark` | `#166534` | dim/active border |
| `--tx` | inline | `#e2e8f0` | body text |
| `--mu` | inline | `#94a3b8` | muted |
| `--dm` | inline | `#475569` | dim/comments |

Syntax classes: `cs-kw cs-ty cs-pr cs-st cs-cm cs-nm cs-op` (C#) · `j-key j-val j-bkt j-cmt` (JSON)

CSS utilities: `.grid-bg` (32px green grid texture; add to all section wrappers) · `.kernel-badge` (bracketed pill + pulsing dot) · `.wrap-anywhere` (overflow-wrap:anywhere word-break:break-word) · `.shrink-children > *` (min-width:0 max-width:100%)

## Content (`src/data/content.ts`)
```
OWNER          personal info
SKILLS         Skill[] → { name, icon: IconType, color }
               icons: react-icons/si (SiDotnet SiAngular SiTypescript SiRedis SiGithubactions SiIonic SiDocker)
                      react-icons/di (DiMsqlServer DiDotnet)
                      react-icons/tb (TbBrandCSharp TbBrandAzure TbBrandWindows)
               ⚠ verify export names before importing (SiSharp exists, SiCsharp does NOT)
EXPERIENCE     git-log entries
PROJECTS       repo cards
C_SHARP_SNIPPET Hero editor code
LOADED_MODULES  Hero pills
```

## Conventions
- `'use client'` → any file with hooks / browser APIs / Framer Motion
- No `Math.random()` / `Date.now()` / `window` at module scope — use `useEffect`
- setState in effects: wrap with `setTimeout(fn, 0)` to satisfy linter
- No `@apply` — all styling via className
- Grid/flex children with overflow: `min-w-0 w-full`; long text: `wrap-anywhere`; code blocks: `overflow-x-auto` + `w-max min-w-full` inner
- JSX comments: `{/* */}`; literal `//`: `{'// text'}`
- Three.js: always `dynamic(..., { ssr: false })`; never import in SSR files
- All sections: `grid-bg py-8 md:py-[42px] px-5 md:px-[38px]`

## Env
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

## Commands
```bash
npm run dev    # Turbopack localhost:3000
npm run build  # must pass before commit
npm run lint   # 0 errors before commit
```

## Mobile
- Sidebar: `-translate-x-full` hidden; hamburger `fixed top-4 right-4 z-[70] md:hidden`
- Hero order: editor(1) → CTAs mobile(2) → text col(3)[badge→tag→h1→role→desc→modules]
- Desktop CTAs: `hidden lg:flex` in text col; mobile CTAs: `flex lg:hidden` below editor
- Skills mobile: radius 2.6 · z=12 · fov=60 · icon 24px · canvas h-[320px]
- Viewport export in layout.tsx prevents browser 980px phantom render

## Boot
`KernelBoot`: sessionStorage `'kernel-boot-played'`; z-[200]; clear in DevTools to replay.
