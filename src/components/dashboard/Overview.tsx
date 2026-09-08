import { scheduleData } from '../../data/schedule'
import { ProgressRing } from '../ui/ProgressRing'
import { StatBlock } from './StatBlock'
import { AreaBreakdown } from './AreaBreakdown'
import { UpNext } from './UpNext'

interface OverviewProps {
  isDone: (id: number) => boolean
  doneCount: number
}

export function Overview({ isDone, doneCount }: OverviewProps) {
  const total = scheduleData.length
  const areasCount = new Set(scheduleData.map((d) => d.area)).size
  const remaining = scheduleData.filter((d) => !isDone(d.id)).slice(0, 4)

  return (
    <div className="flex flex-col gap-6 px-5 py-6 sm:px-10">
      <div className="flex flex-col items-start gap-6 rounded-2xl border border-sand bg-paper p-6 sm:flex-row sm:items-center">
        <ProgressRing value={doneCount} total={total} />
        <div>
          <h2 className="font-display text-2xl text-moss-deep">
            {doneCount === total ? 'Trilha concluída!' : doneCount === 0 ? 'Pronto para começar' : 'Seguindo em frente'}
          </h2>
          <p className="mt-1 max-w-sm text-sm text-ink-soft">
            {total - doneCount} assuntos restantes de {total}, distribuídos em {areasCount} áreas
            ao longo de 14 semanas.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatBlock label="Assuntos" value={String(total)} caption="no ciclo inicial" />
        <StatBlock label="Semanas" value="14" caption="neste ciclo" />
        <StatBlock label="Áreas" value={String(areasCount)} caption="intercaladas" />
        <StatBlock label="Concluídos" value={String(doneCount)} caption="passos dados" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AreaBreakdown isDone={isDone} />
        <UpNext days={remaining} />
      </div>
    </div>
  )
}
