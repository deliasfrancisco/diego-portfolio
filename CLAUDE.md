@AGENTS.md

# Diego Francisco Portfolio — Project Reference

## Stack

| Layer      | Technology                     | Version  |
|------------|-------------------------------|----------|
| Framework  | Next.js (App Router)          | 16.2.6   |
| Runtime    | React                         | 19.2.4   |
| Language   | TypeScript                    | ^5       |
| Styling    | Tailwind CSS v4 (PostCSS)     | ^4       |
| Animation  | Framer Motion                 | ^12.38.0 |
| Font       | JetBrains Mono (@fontsource)  | ^5       |
| Email      | @emailjs/browser              | latest   |

> Tailwind v4 has no `tailwind.config.js`. All theme tokens live in `globals.css` under `@theme {}`.

---

## Directory Structure

```
src/
├── app/
│   ├── globals.css          # Tailwind @theme + CSS vars + syntax highlighting classes
│   ├── layout.tsx           # Root layout + full SEO metadata
│   ├── loading.tsx          # App Router loading UI (terminal boot)
│   ├── page.tsx             # Home — imports all sections, KernelBoot, KeyboardNav
│   ├── robots.ts            # /robots.txt
│   └── sitemap.ts           # /sitemap.xml
│
├── components/
│   ├── KeyboardNav.tsx      # 'use client' — keys 1-6 scroll to sections
│   ├── Sidebar.tsx          # 'use client' — fixed nav, mobile hamburger slide-in
│   │
│   ├── sections/            # One file per page section
│   │   ├── Hero.tsx         # Typewriter headline, C# code editor, boot animation target
│   │   ├── About.tsx        # System card + terminal + stats + GitHub heatmap
│   │   ├── Skills.tsx       # Interactive mouse-parallax canvas, tooltips, pulse clicks
│   │   ├── Experience.tsx   # Git-log timeline (commit meta + body cards)
│   │   ├── Projects.tsx     # Card grid
│   │   └── Contact.tsx      # JSON viewer + EmailJS form (4 status states)
│   │
│   └── ui/                  # Reusable primitives
│       ├── CodeEditor.tsx   # IDE-style code viewer with run button
│       ├── Cursor.tsx       # Blinking terminal cursor
│       ├── GitHubHeatmap.tsx # 52×7 heatmap, seeded mock data, hover tooltip
│       ├── KernelBoot.tsx   # Full-screen boot overlay, sessionStorage guard
│       ├── SectionHeader.tsx # `command ──────` header bar
│       ├── SectionReveal.tsx # Scroll-in left-border accent animation
│       └── TerminalWindow.tsx # macOS-style terminal frame
│
├── data/
│   └── content.ts           # ALL copy: OWNER, SKILLS, EXPERIENCE, PROJECTS, snippets
│
├── hooks/
│   ├── useActiveSection.ts  # IntersectionObserver → active nav id
│   └── useTypewriter.ts     # Character-by-character text reveal
│
├── lib/
│   └── email.ts             # sendEmail() wrapper for @emailjs/browser
│
└── types/
    └── index.ts             # ExperienceEntry, ProjectEntry interfaces
```

---

## Color System

All colors are CSS custom properties set in `globals.css` and exposed as Tailwind tokens via `@theme`.

| CSS var      | Tailwind class    | Hex       | Usage                        |
|--------------|-------------------|-----------|------------------------------|
| `--bg`       | `bg-bg`           | `#070c08` | Page background              |
| `--bg-card`  | `bg-bg-card`      | `#0c1410` | Card / panel background      |
| `--bg-deep`  | `bg-bg-deep`      | `#050a06` | Deepest bg (sidebar, boot)   |
| `--bdr`      | `border-bg-border`| `#1c2e1e` | Default border               |
| `--g`        | `text-green`      | `#22c55e` | Primary accent               |
| `--gb`       | `text-green-bright`| `#4ade80`| Hover / highlight accent     |
| `--gd`       | `text-green-dark` | `#166534` | Dim accent / border active   |
| `--tx`       | `text-[var(--tx)]`| `#e2e8f0` | Body text                    |
| `--mu`       | `text-[var(--mu)]`| `#94a3b8` | Muted text                   |
| `--dm`       | `text-[var(--dm)]`| `#475569` | Dimmer / comments            |

Syntax highlighting classes (defined in `globals.css`):
`cs-kw` · `cs-ty` · `cs-pr` · `cs-st` · `cs-cm` · `cs-nm` · `cs-op` (C#)
`j-key` · `j-val` · `j-bkt` · `j-cmt` (JSON)

---

## Key Conventions

**Client components** — any file using hooks, browser APIs, or Framer Motion must have `'use client'` as first line.

**No hydration-unsafe code** — never call `Math.random()`, `Date.now()`, or access `window`/`sessionStorage` at module scope or in render. Use `useEffect` or `useState` lazy init for client-only values.

**setState in effects** — ESLint rule `react-hooks/set-state-in-effect` flags direct setState in effect bodies. Wrap with `setTimeout(fn, 0)` to defer to a macrotask (satisfies the linter, keeps behavior correct).

**Tailwind v4 syntax** — no `@apply` support in component CSS. All styling via className. Custom values inline with `text-[11px]`, `px-[38px]`, etc.

**Responsive breakpoints** — mobile-first. Desktop sidebar offset via `md:ml-[168px]`. Sections use `px-5 md:px-[38px]`. Grids use `grid-cols-1 md:grid-cols-[...]`.

**Comments in JSX** — use `{/* comment */}` for JSX comments, `{'// text'}` for literal `//` text nodes to avoid `react/jsx-no-comment-textnodes` lint error.

---

## Content Data (`src/data/content.ts`)

Single source of truth for all copy. Update here first; components read from it.

```
OWNER          — personal info (name, location, links, timezone)
SKILLS         — string[] of 15 technology names
EXPERIENCE     — array of git-log-style work entries
INITIAL_COMMIT — first "commit" (graduation)
PROJECTS       — array of repo-card data
C_SHARP_SNIPPET — code shown in Hero editor
LOADED_MODULES — ticker items in Hero
```

---

## Environment Variables

Copy `.env.local.example` → `.env.local` and fill in values.

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

EmailJS keys come from https://emailjs.com → Email Services + Email Templates.

---

## Commands

```bash
npm run dev    # Turbopack dev server at localhost:3000
npm run build  # Production build (must pass before commit)
npm run lint   # ESLint (must pass with 0 errors before commit)
npm run start  # Serve production build
```

---

## Boot Animation

`KernelBoot` renders a full-screen overlay on first visit. Controlled by `sessionStorage.getItem('kernel-boot-played')`. Clear sessionStorage in DevTools to replay. The overlay has `z-[200]` — highest z-index in the project.

## Mobile Layout

Sidebar: hidden off-screen on `< md`, toggled via hamburger (top-right, `z-[70]`).
Content: `ml-0 md:ml-[168px]` on main element.
All sections: `px-5 md:px-[38px]`.
