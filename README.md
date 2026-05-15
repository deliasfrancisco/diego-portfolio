# Diego Francisco — Developer Portfolio

Personal portfolio built with a terminal/IDE aesthetic. Single-page app with animated sections for bio, skills, experience, and projects.

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Font | JetBrains Mono |
| Runtime | Node.js 20+ |

## Project Structure

```
diego-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout, font setup
│   │   ├── page.tsx         # Entry point, section composition
│   │   └── globals.css      # CSS variables, base styles
│   ├── components/
│   │   ├── sections/        # Hero, About, Skills, Experience, Projects, Contact
│   │   ├── ui/              # Cursor, SectionHeader, TerminalWindow, CodeEditor
│   │   └── Sidebar.tsx      # Fixed nav sidebar
│   ├── data/
│   │   └── content.ts       # All portfolio content (single source of truth)
│   ├── hooks/
│   │   ├── useTypewriter.ts # Typewriter animation hook
│   │   └── useActiveSection.ts # IntersectionObserver for nav highlighting
│   └── types/
│       └── index.ts         # Shared TypeScript types
├── public/                  # Static SVG assets
├── next.config.ts
├── tailwind.config (via postcss.config.mjs)
└── tsconfig.json
```

## Getting Started

**Prerequisites:** Node.js 20+, npm 10+

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:3000)
npm run dev
```

## Available Scripts

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Production build
npm run start    # Start production server (requires build first)
npm run lint     # Run ESLint
```

## Customizing Content

All portfolio data lives in `src/data/content.ts`. Edit that file to update owner info, skills, work experience, and project cards — no other files need to change.

## Deployment

Standard Next.js deployment. Recommended platforms: Vercel, Netlify, or any Node.js host.

```bash
npm run build
npm run start
```

For static export or other deployment targets, see the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).
