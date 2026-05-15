export default function Loading() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center font-mono text-[13px]"
      style={{ background: '#050a06' }}
    >
      <span className="text-green-bright">ARCH.KERNEL</span>
      <span className="text-[var(--mu)]">&nbsp;:: loading...</span>
    </div>
  )
}
