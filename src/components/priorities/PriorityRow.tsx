import { motion } from 'framer-motion'
import type { StudyDay } from '../../types'
import { areaStyle } from '../../lib/areaStyle'
import { formatDayMonth } from '../../lib/date'

interface PriorityRowProps { day: StudyDay; done: boolean; onToggle: () => void }
export function PriorityRow({ day, done, onToggle }: PriorityRowProps) {
  const style = areaStyle(day.area)
  return (
    <div className="flex items-start gap-3 border-b border-sand py-4 last:border-none">
      <motion.button whileTap={{ scale: 0.9 }} onClick={onToggle} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors" style={{ borderColor: style.dot, backgroundColor: done ? style.dot : style.bg, color: done ? '#fff' : style.text }} aria-pressed={done} aria-label={`${done ? 'Marcar como não estudado' : 'Marcar como estudado'}: ${day.subject}`}>
        {done ? <span aria-hidden="true">✓</span> : <span className="text-xs font-semibold" aria-hidden="true">{String(day.id).padStart(2, '0')}</span>}
      </motion.button>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-relaxed text-ink">{day.subject.startsWith('[A DEFINIR]') ? 'Assunto a definir' : day.subject}</p>
        <p className="mt-1 text-xs leading-relaxed text-ink-soft">{formatDayMonth(day.date)} · {day.area}{done ? ' · Concluído' : ''}</p>
      </div>
    </div>
  )
}
