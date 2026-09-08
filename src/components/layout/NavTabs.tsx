import { motion } from 'framer-motion'
import type { TabKey } from '../../types'

const TABS: { key: TabKey; label: string; path: string }[] = [
  { key: 'trilha', label: 'Trilha', path: 'M5 5h4v4H5zM15 15h4v4h-4zM7 9v5a3 3 0 0 0 3 3h5M9 7h5a3 3 0 0 1 3 3v5' },
  { key: 'visao-geral', label: 'Visão geral', path: 'M5 20V10M12 20V4M19 20v-7' },
  { key: 'prioridades', label: 'Assuntos', path: 'M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01' },
  { key: 'regras', label: 'Orientações', path: 'M12 17v-5M12 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0' },
]
interface NavTabsProps { active: TabKey; onChange: (tab: TabKey) => void }

export function NavTabs({ active, onChange }: NavTabsProps) {
  return (
    <nav aria-label="Seções da trilha" className="section-nav">
      {TABS.map((tab) => (
        <button key={tab.key} onClick={() => onChange(tab.key)} aria-current={active === tab.key ? 'page' : undefined} className="nav-button">
          {active === tab.key && <motion.span layoutId="nav-active" className="absolute inset-1 rounded-xl bg-moss-deep" transition={{ type: 'spring', stiffness: 450, damping: 36 }} />}
          <svg className="relative h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={tab.path} /></svg>
          <span className="relative">{tab.label}</span>
        </button>
      ))}
    </nav>
  )
}
