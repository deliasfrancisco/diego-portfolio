'use client'
import { useState, useEffect } from 'react'

export function useTypewriter(text: string, speed = 55, delay = 400) {
  const [displayText, setDisplayText] = useState('')
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const reset = setTimeout(() => {
      setDisplayText('')
      setIsDone(false)
    }, 0)
    let idx = 0
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        idx++
        setDisplayText(text.slice(0, idx))
        if (idx >= text.length) {
          clearInterval(interval)
          setIsDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => {
      clearTimeout(reset)
      clearTimeout(startTimeout)
    }
  }, [text, speed, delay])

  return { displayText, isDone }
}
