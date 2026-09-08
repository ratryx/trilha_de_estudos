import type { StudyDay } from '../../types'
import { DayNode } from './DayNode'

interface WeekRowProps {
  week: number; days: StudyDay[]; isDone: (id: number) => boolean
  selectedId: number | null; onSelect: (day: StudyDay) => void
}
export function WeekRow({ week, days, isDone, selectedId, onSelect }: WeekRowProps) {
  const doneCount = days.filter((d) => isDone(d.id)).length
  return (
    <section aria-labelledby={`week-${week}`} className="week-section">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand/70 font-display text-base text-moss-deep">{String(week).padStart(2, '0')}</span>
        <h3 id={`week-${week}`} className="font-display text-lg text-moss-deep">Semana {week}</h3>
        <span className="ml-auto text-xs text-ink-soft">{doneCount === days.length ? 'Concluída ✓' : `${doneCount} de ${days.length} concluídos`}</span>
      </div>
      <div className="grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-2 lg:grid-cols-4">
        {days.map((day) => <DayNode key={day.id} day={day} done={isDone(day.id)} selected={selectedId === day.id} onSelect={() => onSelect(day)} />)}
      </div>
    </section>
  )
}
