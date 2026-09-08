interface FilterBarProps {
  query: string
  onQuery: (v: string) => void
  area: string
  onArea: (v: string) => void
  areas: string[]
}

export function FilterBar({ query, onQuery, area, onArea, areas }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input type="search" aria-label="Buscar assunto"
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        placeholder="Buscar assunto"
        className="w-full rounded-xl border border-sand bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-moss sm:max-w-xs"
      />
      <select aria-label="Filtrar por área"
        value={area}
        onChange={(e) => onArea(e.target.value)}
        className="w-full rounded-xl border border-sand bg-paper px-4 py-2.5 text-sm text-ink outline-none focus:border-moss sm:max-w-xs"
      >
        <option value="">Todas as áreas</option>
        {areas.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  )
}
