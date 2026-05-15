interface SectionHeaderProps {
  command: string
}

export default function SectionHeader({ command }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 font-mono text-green text-sm mb-7">
      {command}
      <div className="flex-1 h-px bg-bg-border ml-2" />
    </div>
  )
}
