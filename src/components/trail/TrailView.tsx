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
    <div className="px-6 py-6 sm:px-10">
      {weeks.map(([week, days]) => (
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
