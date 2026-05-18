'use client'
import { LangProvider } from '@/contexts/LangContext'
import type { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return <LangProvider>{children}</LangProvider>
}
