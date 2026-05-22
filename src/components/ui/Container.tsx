import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  noVerticalPadding?: boolean
}

export default function Container({
  children,
  className = '',
  noVerticalPadding = false,
}: ContainerProps) {
  return (
    <div
      className={`
        w-full max-w-[1280px] mx-auto
        px-5 md:px-12
        ${noVerticalPadding ? '' : 'py-8 md:py-[42px]'}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
