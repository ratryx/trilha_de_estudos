import { useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion'
import type { TabKey } from './types'
import { scheduleData } from './data/schedule'
import { useProgress } from './hooks/useProgress'
import { Header } from './components/layout/Header'
import { NavTabs } from './components/layout/NavTabs'
import { TrailView } from './components/trail/TrailView'
import { Overview } from './components/dashboard/Overview'
import { PrioritiesView } from './components/priorities/PrioritiesView'
import { RulesView } from './components/rules/RulesView'

export default function App() {
  const [tab, setTab] = useState<TabKey>('trilha')
  const { isDone, toggle, count, storageError } = useProgress()
  const reducedMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.22, ease: 'easeOut' }}>
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <div className="app-shell">
        <Header doneCount={count} total={scheduleData.length} />
        <NavTabs active={tab} onChange={setTab} />
        {storageError && <p role="status" className="mx-5 mt-4 rounded-xl bg-sand p-3 text-sm">Seu progresso está disponível nesta sessão, mas não foi possível salvá-lo neste navegador.</p>}
        <main id="conteudo" tabIndex={-1}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={tab} initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>
              {tab === 'trilha' && <TrailView isDone={isDone} toggle={toggle} />}
              {tab === 'visao-geral' && <Overview isDone={isDone} doneCount={count} />}
              {tab === 'prioridades' && <PrioritiesView isDone={isDone} toggle={toggle} />}
              {tab === 'regras' && <RulesView />}
            </motion.div>
          </AnimatePresence>
        </main>
        <footer className="px-5 py-8 text-center text-xs text-ink-soft">Um assunto de cada vez. No seu ritmo.</footer>
      </div>
    </MotionConfig>
  )
}
