import { motion, useReducedMotion } from 'framer-motion'

interface HeaderProps { doneCount: number; total: number }

export function Header({ doneCount, total }: HeaderProps) {
  const reducedMotion = useReducedMotion()
  const progress = total ? doneCount / total : 0
  return (
    <header className="relative overflow-hidden px-5 pb-7 pt-8 sm:px-10 sm:pb-9 sm:pt-12">
      <motion.div className="hero-orbit" aria-hidden="true" initial={{ opacity: 0, rotate: reducedMotion ? 0 : -18 }} animate={{ opacity: 1, rotate: 0 }} transition={{ duration: reducedMotion ? 0 : 0.9 }}><span /><span /><span /></motion.div>
      <div className="relative">
        <p className="eyebrow">SEU PONTAPÉ INICIAL · 14 SEMANAS</p>
        <h1 className="mt-3 max-w-lg font-display text-4xl leading-tight text-moss-deep sm:text-5xl">Pequenos passos.<br />Grandes conquistas.</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">Sua trilha de estudos, com espaço para aprender no seu ritmo.</p>
        <div className="mt-6 max-w-md">
          <div className="mb-2 flex items-center justify-between gap-3 text-xs text-ink-soft">
            <span>Trilha de estudos</span><span aria-live="polite">{doneCount} de {total} concluídos · {Math.round(progress * 100)}%</span>
          </div>
          <div role="progressbar" aria-label="Progresso total" aria-valuenow={doneCount} aria-valuemin={0} aria-valuemax={total} className="h-1.5 overflow-hidden rounded-full bg-sand">
            <motion.div className="h-full origin-left rounded-full bg-moss" initial={false} animate={{ scaleX: progress }} transition={{ duration: reducedMotion ? 0 : 0.45 }} />
          </div>
        </div>
      </div>
    </header>
  )
}
