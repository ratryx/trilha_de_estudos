import { motion } from 'framer-motion'
import type { StudyDay } from '../../types'
import { areaStyle } from '../../lib/areaStyle'
import { formatDayMonth, formatWeekday, isToday } from '../../lib/date'

interface DayNodeProps { day: StudyDay; done: boolean; selected: boolean; onSelect: () => void }
export function DayNode({ day, done, selected, onSelect }: DayNodeProps) {
  const style = areaStyle(day.area)
  const today = isToday(day.date)
  const placeholder = day.subject.startsWith('[A DEFINIR]')
  return (
    <motion.button onClick={onSelect} whileTap={{ scale: 0.985 }} aria-haspopup="dialog" aria-label={`${day.subject}, ${formatDayMonth(day.date)}, ${done ? 'concluído' : 'pendente'}`} className={`day-card ${done ? 'is-done' : ''} ${selected ? 'is-selected' : ''}`}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border" style={{ background: done ? style.dot : style.bg, color: done ? '#fff' : style.text, borderColor: style.dot }}>
        {done ? <motion.svg initial={{ scale: 0.7 }} animate={{ scale: 1 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m5 12 4 4L19 6" /></motion.svg> : <span className="text-xs font-bold">{String(day.id).padStart(2, '0')}</span>}
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-1 flex flex-wrap items-center gap-2 text-xs text-ink-soft">{formatWeekday(day.date)} · {formatDayMonth(day.date)}{today && <span className="rounded-full bg-sand px-2 py-0.5 font-semibold text-moss-deep">Hoje</span>}</span>
        <span className="block text-sm font-semibold leading-relaxed text-ink">{placeholder ? 'Assunto a definir' : day.subject}</span>
        <span className="mt-1 block text-xs leading-relaxed text-ink-soft">{day.area}{done ? ' · Concluído' : ''}</span>
      </span>
      <span className="self-center text-moss-light lg:hidden" aria-hidden="true">↗</span>
    </motion.button>
  )
}
