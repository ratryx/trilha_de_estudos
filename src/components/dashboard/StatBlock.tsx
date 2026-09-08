interface StatBlockProps {
  label: string
  value: string
  caption?: string
}

export function StatBlock({ label, value, caption }: StatBlockProps) {
  return (
    <div className="rounded-2xl border border-sand bg-paper p-5">
      <p className="text-sm text-ink-soft">{label}</p>
      <p className="mt-1 font-display text-3xl text-moss-deep">{value}</p>
      {caption && <p className="mt-1 text-xs text-ink-soft">{caption}</p>}
    </div>
  )
}
