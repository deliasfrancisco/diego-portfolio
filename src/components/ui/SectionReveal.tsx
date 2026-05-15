'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function SectionReveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-green-dark"
        style={{ transformOrigin: 'top' }}
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      />
      {children}
    </div>
  )
}
