import type { StudyDay } from '../../types'
import { areaStyle } from '../../lib/areaStyle'
import { formatDayMonth } from '../../lib/date'
import { Tag } from '../ui/Tag'

interface PriorityRowProps {
  day: StudyDay
  done: boolean
  onToggle: () => void
}

export function PriorityRow({ day, done, onToggle }: PriorityRowProps) {
  const style = areaStyle(day.area)
  const isPlaceholder = day.subject.startsWith('[A DEFINIR]')

  return (
    <div className="flex items-center gap-4 border-b border-sand py-3 last:border-none">
      <span className="w-7 shrink-0 text-xs text-ink-soft">{day.id}</span>
      <button
        onClick={onToggle}
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
        style={{
          borderColor: style.dot,
          backgroundColor: done ? style.dot : 'transparent',
        }}
        aria-label={done ? 'Marcar como não estudado' : 'Marcar como estudado'}
      >
        {done && (
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8.5L6.2 11.5L13 4.5"
              stroke="var(--color-paper)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm ${isPlaceholder ? 'italic text-ink-soft' : 'text-ink'}`}>
          {day.subject}
        </p>
        <p className="text-xs text-ink-soft">{formatDayMonth(day.date)}</p>
      </div>
      <Tag {...style} label={day.area} />
    </div>
  )
}
