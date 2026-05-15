'use client'
import { useEffect } from 'react'

const KEYS: Record<string, string> = {
  '1': 'hero', '2': 'about',      '3': 'skills',
  '4': 'experience', '5': 'projects', '6': 'contact',
}

export default function KeyboardNav() {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      const id = KEYS[e.key]
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])
  return null
}
