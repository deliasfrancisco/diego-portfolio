'use client'
import { useEffect, useRef, useState } from 'react'

export default function CursorGlow() {
  const glowRef   = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(window.matchMedia('(pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!show) return
    const glow   = glowRef.current
    const circle = circleRef.current
    if (!glow || !circle) return

    const onMove = (e: MouseEvent) => {
      glow.style.opacity   = '1'
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`

      circle.style.opacity   = '1'
      circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [show])

  if (!show) return null

  return (
    <>
      <div ref={circleRef} aria-hidden className="cursor-circle" />
      <div ref={glowRef}   aria-hidden className="cursor-glow" />
    </>
  )
}
