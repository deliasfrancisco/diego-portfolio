'use client'

interface CursorProps {
  className?: string
}

export default function Cursor({ className = '' }: CursorProps) {
  return (
    <span
      className={`inline-block w-[0.1em] h-[1em] bg-green align-middle animate-blink ${className}`}
    />
  )
}
