import { useMemo, useState } from 'react'
import type { StudyDay } from '../../types'
import { scheduleData } from '../../data/schedule'
import { WeekRow } from './WeekRow'
import { DayDetail } from './DayDetail'

interface TrailViewProps {
  isDone: (id: number) => boolean
  toggle: (id: number) => void
}

export function TrailView({ isDone, toggle }: TrailViewProps) {
  const [selected, setSelected] = useState<StudyDay | null>(null)

  const weeks = useMemo(() => {
    const map = new Map<number, StudyDay[]>()
    for (const day of scheduleData) {
      const list = map.get(day.week) ?? []
      list.push(day)
      map.set(day.week, list)
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0])
  }, [])

  return (
    <div className="px-5 py-6 sm:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
<div><p className="eyebrow">A JORNADA É SUA</p><h2 className="mt-2 font-display text-2xl text-moss-deep">Sua trilha, um dia de cada vez</h2><p className="mt-2 text-sm text-ink-soft">Toque em um assunto para ver os detalhes e concluir o estudo.</p></div>
{scheduleData.some((day) => !isDone(day.id)) ? <button className="primary-button shrink-0" onClick={() => setSelected(scheduleData.find((day) => !isDone(day.id)) ?? null)}>Continuar estudo <span aria-hidden="true">↗</span></button> : <p role="status" className="text-sm font-semibold text-moss">Trilha concluída! ✓</p>}
</div>{weeks.map(([week, days]) => (
        <WeekRow
          key={week}
          week={week}
          days={days}
          isDone={isDone}
          selectedId={selected?.id ?? null}
          onSelect={setSelected}
        />
      ))}
      <DayDetail
        day={selected}
        done={selected ? isDone(selected.id) : false}
        onToggle={toggle}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
