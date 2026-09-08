import { useMemo, useState } from 'react'
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
  const { isDone, toggle, count } = useProgress()

  const nextSubject = useMemo(() => {
    const next = scheduleData.find((d) => !isDone(d.id))
    return next?.subject ?? null
  }, [isDone])

  return (
    <div className="min-h-screen bg-ice">
      <div className="mx-auto max-w-4xl">
        <Header nextSubject={nextSubject} />
        <NavTabs active={tab} onChange={setTab} />
        <main>
          {tab === 'trilha' && <TrailView isDone={isDone} toggle={toggle} />}
          {tab === 'visao-geral' && <Overview isDone={isDone} doneCount={count} />}
          {tab === 'prioridades' && <PrioritiesView isDone={isDone} toggle={toggle} />}
          {tab === 'regras' && <RulesView />}
        </main>
      </div>
    </div>
  )
}
