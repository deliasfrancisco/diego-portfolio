import CursorGlow from '@/components/ui/CursorGlow'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import ScrollProgress from '@/components/ScrollProgress'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import Contact from '@/components/sections/Contact'
import KernelBoot from '@/components/ui/KernelBoot'
import KeyboardNav from '@/components/KeyboardNav'
import LangToggle from '@/components/ui/LangToggle'
import Footer from '@/components/ui/Footer'
import { SectionReveal } from '@/components/ui/SectionReveal'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-bg">
      <CursorGlow />
      <WhatsAppButton />
      <KernelBoot />
      <KeyboardNav />
      <LangToggle />
      <ScrollProgress />
      <main className="flex-1">
        <SectionReveal delay={0.4}>
          <section id="hero"><Hero /></section>
        </SectionReveal>
        <SectionReveal>
          <section id="about" className="border-t border-bg-border"><About /></section>
        </SectionReveal>
        <SectionReveal>
          <section id="skills" className="border-t border-bg-border"><Skills /></section>
        </SectionReveal>
        <SectionReveal>
          <section id="experience" className="border-t border-bg-border"><Experience /></section>
        </SectionReveal>
        <SectionReveal>
          <section id="projects" className="border-t border-bg-border"><Projects /></section>
        </SectionReveal>
        <SectionReveal>
          <section id="contact" className="border-t border-bg-border"><Contact /></section>
        </SectionReveal>
        <Footer />
      </main>
    </div>
  )
}
