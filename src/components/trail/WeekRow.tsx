import type { StudyDay } from '../../types'
import { DayNode } from './DayNode'

interface WeekRowProps {
  week: number
  days: StudyDay[]
  isDone: (id: number) => boolean
  selectedId: number | null
  onSelect: (day: StudyDay) => void
}

export function WeekRow({ week, days, isDone, selectedId, onSelect }: WeekRowProps) {
  const doneCount = days.filter((d) => isDone(d.id)).length

  return (
    <div className="flex gap-4 border-b border-sand py-4 last:border-none">
      <div className="flex w-16 shrink-0 flex-col items-start pt-3">
        <span className="font-display text-xl text-moss-deep">{String(week).padStart(2, '0')}</span>
        <span className="text-[11px] text-ink-soft">
          {doneCount}/{days.length}
        </span>
      </div>
      <div className="relative flex flex-1 gap-1 overflow-x-auto pb-1">
        <div className="pointer-events-none absolute left-0 right-0 top-[38px] h-px bg-sand" />
        {days.map((day) => (
          <DayNode
            key={day.id}
            day={day}
            done={isDone(day.id)}
            selected={selectedId === day.id}
            onSelect={() => onSelect(day)}
          />
        ))}
      </div>
    </div>
  )
}
