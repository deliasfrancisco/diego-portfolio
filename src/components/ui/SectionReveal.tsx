'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function SectionReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.05 })

  return (
    <div ref={ref} className={`relative ${className ?? ''}`}>
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-green-dark origin-top"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut', delay: delay + 0.2 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut', delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}
