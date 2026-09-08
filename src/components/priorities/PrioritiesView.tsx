import { useMemo, useState } from 'react'
import { scheduleData } from '../../data/schedule'
import { allAreas } from '../../lib/areaStyle'
import { FilterBar } from './FilterBar'
import { PriorityRow } from './PriorityRow'

interface PrioritiesViewProps {
  isDone: (id: number) => boolean
  toggle: (id: number) => void
}

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export function PrioritiesView({ isDone, toggle }: PrioritiesViewProps) {
  const [query, setQuery] = useState('')
  const [area, setArea] = useState('')

  const filtered = useMemo(() => {
    return scheduleData
      .slice()
      .sort((a, b) => a.id - b.id)
      .filter((d) => (area ? d.area === area : true))
      .filter((d) => normalize(d.subject).includes(normalize(query)))
  }, [query, area])

  return (
    <div className="flex flex-col gap-5 px-5 py-6 sm:px-10">
      <div>
        <h2 className="font-display text-2xl text-moss-deep">Seus assuntos</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Os assuntos de maior relevância, na ordem em que entram no cronograma.
        </p>
      </div>
      <FilterBar query={query} onQuery={setQuery} area={area} onArea={setArea} areas={allAreas()} />
      <p role="status" className="text-xs text-ink-soft">{filtered.length} de {scheduleData.length} assuntos</p>
<div className="rounded-2xl border border-sand bg-paper px-4">
        {filtered.length === 0 ? (
          <p className="py-6 text-center text-sm text-ink-soft">Nenhum assunto encontrado.</p>
        ) : (
          filtered.map((day) => (
            <PriorityRow key={day.id} day={day} done={isDone(day.id)} onToggle={() => toggle(day.id)} />
          ))
        )}
      </div>
    </div>
  )
}
