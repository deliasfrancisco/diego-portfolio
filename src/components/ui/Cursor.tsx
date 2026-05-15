'use client'

interface CursorProps {
  className?: string
}

export default function Cursor({ className = '' }: CursorProps) {
  return (
    <span
      className={`inline-block w-[7px] h-[13px] bg-green align-middle animate-blink ${className}`}
    />
  )
}
