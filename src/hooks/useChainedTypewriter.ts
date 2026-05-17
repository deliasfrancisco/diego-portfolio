'use client'
import { useState, useEffect } from 'react'

export function useChainedTypewriter(first: string, second: string, speed = 55, delay = 400) {
  const [firstText,  setFirstText]  = useState('')
  const [secondText, setSecondText] = useState('')
  const [isDone,     setIsDone]     = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setFirstText('')
      setSecondText('')
      setIsDone(false)
    }, 0)

    let phase: 1 | 2 = 1
    let idx = 0

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        idx++
        if (phase === 1) {
          setFirstText(first.slice(0, idx))
          if (idx >= first.length) {
            phase = 2
            idx = 0
          }
        } else {
          setSecondText(second.slice(0, idx))
          if (idx >= second.length) {
            clearInterval(interval)
            setTimeout(() => setIsDone(true), 0)
          }
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [first, second, speed, delay])

  return { firstText, secondText, isDone }
}
