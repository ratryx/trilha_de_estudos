import { motion } from 'framer-motion'
import { scheduleData } from '../../data/schedule'
import { areaStyle } from '../../lib/areaStyle'

interface AreaBreakdownProps {
  isDone: (id: number) => boolean
}

export function AreaBreakdown({ isDone }: AreaBreakdownProps) {
  const counts = new Map<string, { total: number; done: number }>()
  for (const day of scheduleData) {
    const entry = counts.get(day.area) ?? { total: 0, done: 0 }
    entry.total += 1
    if (isDone(day.id)) entry.done += 1
    counts.set(day.area, entry)
  }
  const rows = [...counts.entries()].sort((a, b) => b[1].total - a[1].total)
  const max = Math.max(...rows.map(([, v]) => v.total))

  return (
    <div className="rounded-2xl border border-sand bg-paper p-5">
      <h3 className="font-display text-lg text-moss-deep">Assuntos por área</h3>
      <div className="mt-4 flex flex-col gap-3">
        {rows.map(([area, { total, done }]) => {
          const style = areaStyle(area)
          return (
            <div key={area} className="flex items-center gap-3">
              <span className="w-40 shrink-0 truncate text-xs text-ink-soft" title={area}>
                {area}
              </span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ice">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: style.dot }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(total / max) * 100}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-xs text-ink-soft">
                {done}/{total}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
