import type { StudyDay } from '../../types'
import { areaStyle } from '../../lib/areaStyle'
import { formatDayMonth, formatWeekday } from '../../lib/date'

interface UpNextProps {
  days: StudyDay[]
}

export function UpNext({ days }: UpNextProps) {
  return (
    <div className="rounded-2xl border border-sand bg-paper p-5">
      <h3 className="font-display text-lg text-moss-deep">Próximos passos</h3>
      {days.length === 0 ? (
        <p className="mt-3 text-sm text-ink-soft">
          Tudo marcado por aqui. Hora de revisar ou seguir em frente.
        </p>
      ) : (
        <ul className="mt-3 flex flex-col gap-3">
          {days.map((day) => {
            const style = areaStyle(day.area)
            return (
              <li key={day.id} className="flex items-center gap-3">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: style.dot }}
                />
                <span className="w-16 shrink-0 text-xs text-ink-soft">
                  {formatWeekday(day.date)} {formatDayMonth(day.date)}
                </span>
                <span className="min-w-0 text-sm leading-relaxed text-ink">{day.subject}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
