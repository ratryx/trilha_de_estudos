import { motion, useReducedMotion } from 'framer-motion'
import { scheduleData } from '../../data/schedule'
import { areaStyle } from '../../lib/areaStyle'

interface AreaBreakdownProps { isDone: (id: number) => boolean }
export function AreaBreakdown({ isDone }: AreaBreakdownProps) {
  const reducedMotion = useReducedMotion()
  const counts = new Map<string, { total: number; done: number }>()
  for (const day of scheduleData) {
    const entry = counts.get(day.area) ?? { total: 0, done: 0 }
    entry.total += 1
    if (isDone(day.id)) entry.done += 1
    counts.set(day.area, entry)
  }
  return (
    <div className="min-w-0 rounded-2xl border border-sand bg-paper p-5">
      <h3 className="font-display text-lg text-moss-deep">Progresso por área</h3>
      <div className="mt-5 flex flex-col gap-4">
        {[...counts.entries()].sort((a, b) => b[1].total - a[1].total).map(([area, { total, done }]) => (
          <div key={area}>
            <div className="mb-2 flex items-start justify-between gap-3 text-xs text-ink-soft"><span>{area}</span><span className="shrink-0">{done}/{total}</span></div>
            <div role="progressbar" aria-label={area} aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} className="h-1.5 overflow-hidden rounded-full bg-sand/60">
              <motion.div className="h-full origin-left rounded-full" style={{ backgroundColor: areaStyle(area).dot }} initial={{ scaleX: 0 }} animate={{ scaleX: done / total }} transition={{ duration: reducedMotion ? 0 : 0.45 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
