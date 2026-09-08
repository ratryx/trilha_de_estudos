import { motion } from 'framer-motion'
import type { StudyDay } from '../../types'
import { areaStyle } from '../../lib/areaStyle'
import { formatDayMonth, formatWeekday, isToday } from '../../lib/date'

interface DayNodeProps {
  day: StudyDay
  done: boolean
  selected: boolean
  onSelect: () => void
}

export function DayNode({ day, done, selected, onSelect }: DayNodeProps) {
  const style = areaStyle(day.area)
  const today = isToday(day.date)

  return (
    <button
      onClick={onSelect}
      className="group flex w-24 shrink-0 flex-col items-center gap-2 rounded-2xl py-2 text-center transition-colors"
    >
      <span className="text-[11px] text-ink-soft">
        {formatWeekday(day.date)} · {formatDayMonth(day.date)}
      </span>
      <motion.span
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex h-11 w-11 items-center justify-center rounded-full border-2 transition-shadow"
        style={{
          backgroundColor: done ? style.dot : 'var(--color-paper)',
          borderColor: today ? 'var(--color-ochre)' : style.dot,
          boxShadow: selected ? `0 0 0 3px ${style.bg}` : 'none',
        }}
      >
        {done ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8.5L6.2 11.5L13 4.5"
              stroke="var(--color-paper)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <span className="text-xs font-semibold" style={{ color: style.dot }}>
            {day.week}
          </span>
        )}
      </motion.span>
      <span className="line-clamp-2 text-[11px] leading-tight text-ink-soft group-hover:text-ink">
        {day.subject}
      </span>
    </button>
  )
}
