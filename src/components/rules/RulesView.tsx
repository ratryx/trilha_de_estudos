import { rulesData } from '../../data/rules'

export function RulesView() {
  return (
    <div className="px-6 py-6 sm:px-10">
      <h2 className="font-display text-2xl text-moss-deep">Regras para estas 14 semanas</h2>
      <p className="mt-1 max-w-lg text-sm text-ink-soft">
        As decisões por trás da ordem e do ritmo deste cronograma.
      </p>

      <div className="mt-6 flex flex-col">
        {rulesData.map((rule, i) => (
          <div
            key={rule.item}
            className="grid grid-cols-1 gap-1 border-b border-sand py-4 last:border-none sm:grid-cols-[10rem_1fr] sm:gap-6"
          >
            <div className="flex items-baseline gap-2">
              <span className="font-display text-lg text-moss">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm font-medium text-ink">{rule.item}</span>
            </div>
            <p className="text-sm leading-relaxed text-ink-soft">{rule.decision}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
