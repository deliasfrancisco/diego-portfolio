'use client'
import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef   = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow   = glowRef.current
    const circle = circleRef.current
    if (!glow || !circle || !window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      glow.style.opacity   = '1'
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`

      circle.style.opacity   = '1'
      circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div
        ref={circleRef}
        aria-hidden
        style={{
          position:     'fixed',
          top:          '-8px',
          left:         '-8px',
          width:        '16px',
          height:       '16px',
          borderRadius: '50%',
          border:       '1.5px solid #22c55e',
          pointerEvents: 'none',
          zIndex:       9999,
          opacity:      0,
          willChange:   'transform',
        }}
      />
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position:     'fixed',
          top:          '-180px',
          left:         '-180px',
          width:        '360px',
          height:       '360px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(34,197,94,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex:       1,
          opacity:      0,
          willChange:   'transform',
        }}
      />
    </>
  )
}
