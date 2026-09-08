import { AnimatePresence, motion } from 'framer-motion'
import type { StudyDay } from '../../types'
import { areaStyle } from '../../lib/areaStyle'
import { formatDayMonth, formatWeekday } from '../../lib/date'
import { Tag } from '../ui/Tag'

interface DayDetailProps {
  day: StudyDay | null
  done: boolean
  onToggle: (id: number) => void
  onClose: () => void
}

export function DayDetail({ day, done, onToggle, onClose }: DayDetailProps) {
  return (
    <AnimatePresence>
      {day && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-ink/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col gap-5 bg-paper p-7 shadow-xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <button
              onClick={onClose}
              className="self-end text-sm text-ink-soft transition-colors hover:text-ink"
            >
              Fechar
            </button>

            <div>
              <span className="text-sm text-ink-soft">
                Semana {day.week} · {formatWeekday(day.date)}, {formatDayMonth(day.date)}
              </span>
              <h2 className="mt-1 font-display text-2xl text-moss-deep">{day.subject}</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <Tag {...areaStyle(day.area)} label={day.area} />
              <Tag bg="#F3E4DF" text="#6B3D31" label={`Prioridade ${day.priority.toLowerCase()}`} />
            </div>

            {day.observation && (
              <p className="rounded-xl bg-ice p-4 text-sm leading-relaxed text-ink-soft">
                {day.observation}
              </p>
            )}

            <button
              onClick={() => onToggle(day.id)}
              className="mt-auto rounded-full px-4 py-2.5 text-sm font-medium transition-colors"
              style={{
                backgroundColor: done ? 'var(--color-sand)' : 'var(--color-moss)',
                color: done ? 'var(--color-ink)' : 'var(--color-paper)',
              }}
            >
              {done ? 'Marcar como não estudado' : 'Marcar como estudado'}
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
