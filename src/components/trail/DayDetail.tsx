import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import type { StudyDay } from '../../types'
import { areaStyle } from '../../lib/areaStyle'
import { formatDayMonth, formatWeekday } from '../../lib/date'
import { Tag } from '../ui/Tag'

interface DayDetailProps { day: StudyDay | null; done: boolean; onToggle: (id: number) => void; onClose: () => void }

export function DayDetail({ day, done, onToggle, onClose }: DayDetailProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const reducedMotion = useReducedMotion()
  const open = day !== null
  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    dialog?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true })
    document.body.style.overflow = 'hidden'
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [open])

  if (!day) return null
  return createPortal(
    <dialog ref={dialogRef} className="study-dialog" aria-labelledby="day-title" onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not([disabled])')
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
      }} onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <motion.div className="detail-content" initial={{ opacity: 0, y: reducedMotion ? 0 : 24 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 350, damping: 32 }}>
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow">SEU MOMENTO DE ESTUDO</span>
          <button autoFocus onClick={onClose} className="close-button" aria-label="Fechar detalhes">✕</button>
        </div>
        <div className="detail-body">
          <p className="text-sm text-ink-soft">Semana {day.week} · {formatWeekday(day.date)}, {formatDayMonth(day.date)}</p>
          <h2 id="day-title" className="mt-3 font-display text-3xl leading-tight text-moss-deep">{day.subject.startsWith('[A DEFINIR]') ? 'Assunto a definir' : day.subject}</h2>
          <div className="mt-5 flex flex-wrap gap-2"><Tag {...areaStyle(day.area)} label={day.area} /></div>
          <p className="mt-6 rounded-2xl bg-ice p-5 text-sm leading-relaxed text-ink-soft">{day.observation || 'Uma aula por dia. Você não precisa esgotar o tema para dar o próximo passo.'}</p>
          <p aria-live="polite" className="mt-5 text-sm font-medium text-moss-deep">{done ? '✓ Estudo concluído. Mais um passo dado!' : 'Tudo pronto para começar.'}</p>
        </div>
        <motion.button whileTap={{ scale: 0.98 }} onClick={() => onToggle(day.id)} aria-pressed={done} className={`primary-button w-full ${done ? 'completed-button' : ''}`}>{done ? 'Marcar como não estudado' : 'Concluir este estudo'}</motion.button>
      </motion.div>
    </dialog>, document.body,
  )
}
