import Sidebar from '@/components/Sidebar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import KernelBoot from '@/components/ui/KernelBoot'
import KeyboardNav from '@/components/KeyboardNav'
import { SectionReveal } from '@/components/ui/SectionReveal'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-bg">
      <KernelBoot />
      <KeyboardNav />
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-[168px]">
        <SectionReveal>
          <section id="hero"><Hero /></section>
        </SectionReveal>
        <SectionReveal className="border-t border-bg-border">
          <section id="about"><About /></section>
        </SectionReveal>
        <SectionReveal className="border-t border-bg-border">
          <section id="skills"><Skills /></section>
        </SectionReveal>
        <SectionReveal className="border-t border-bg-border">
          <section id="experience"><Experience /></section>
        </SectionReveal>
        <SectionReveal className="border-t border-bg-border">
          <section id="projects"><Projects /></section>
        </SectionReveal>
        <SectionReveal className="border-t border-bg-border">
          <section id="contact"><Contact /></section>
        </SectionReveal>
        <footer
          className="py-6 md:py-4 px-5 md:px-12 text-center font-mono text-[10px] border-t border-bg-border"
          style={{ color: 'var(--dm)' }}
        >
          Built with Next.js · TypeScript · Tailwind · {'// Diego Francisco © 2026'}
          <div className="mt-1 opacity-50">keys 1–6 navigate sections</div>
        </footer>
      </main>
    </div>
  )
}
