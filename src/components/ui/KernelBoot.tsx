'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  { text: 'ARCH.KERNEL :: v7.0.0',                type: 'title' },
  { text: '> Initializing .NET runtime...     [OK]', type: 'ok'    },
  { text: '> Mounting Angular modules...      [OK]', type: 'ok'    },
  { text: '> Connecting to SQL Server...      [OK]', type: 'ok'    },
  { text: '> Loading portfolio components...  [OK]', type: 'ok'    },
  { text: '> System ready.',                        type: 'ready'  },
]

export default function KernelBoot() {
  const [show, setShow]   = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (sessionStorage.getItem('kernel-boot-played')) {
      const t = setTimeout(() => setShow(false), 0)
      return () => clearTimeout(t)
    }
    let n = 0
    const id = setInterval(() => {
      n += 1
      setCount(n)
      if (n >= LINES.length) {
        clearInterval(id)
        setTimeout(() => {
          setShow(false)
          sessionStorage.setItem('kernel-boot-played', '1')
        }, 500)
      }
    }, 220)
    return () => clearInterval(id)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: '#050a06' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="font-mono text-[13px] leading-7 min-w-[340px]">
            {LINES.slice(0, count).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.12 }}
                className={
                  line.type === 'title'
                    ? 'text-green-bright font-bold mb-2'
                    : line.type === 'ready'
                    ? 'text-green mt-1'
                    : 'text-[var(--mu)]'
                }
              >
                {line.type === 'ok' ? (
                  <>
                    <span>{line.text.replace('[OK]', '')}</span>
                    <span className="text-green">[OK]</span>
                  </>
                ) : (
                  line.text
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
