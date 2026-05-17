import CursorGlow from '@/components/ui/CursorGlow'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Sidebar from '@/components/Sidebar'
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
      <Sidebar />
      <main className="flex-1 ml-0 md:ml-[168px]">
        <SectionReveal delay={0.4}>
          <section id="hero"><Hero /></section>
        </SectionReveal>
        <SectionReveal>
          <section id="about"><About /></section>
        </SectionReveal>
        <SectionReveal>
          <section id="skills"><Skills /></section>
        </SectionReveal>
        <SectionReveal>
          <section id="experience"><Experience /></section>
        </SectionReveal>
        <SectionReveal>
          <section id="projects"><Projects /></section>
        </SectionReveal>
        <SectionReveal>
          <section id="contact"><Contact /></section>
        </SectionReveal>
        <Footer />
      </main>
    </div>
  )
}
