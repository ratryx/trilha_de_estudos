import { motion } from 'framer-motion'
import type { TabKey } from '../../types'

const TABS: { key: TabKey; label: string }[] = [
  { key: 'trilha', label: 'Trilha' },
  { key: 'visao-geral', label: 'Visão geral' },
  { key: 'prioridades', label: 'As 56 prioridades' },
  { key: 'regras', label: 'Regras' },
]

interface NavTabsProps {
  active: TabKey
  onChange: (tab: TabKey) => void
}

export function NavTabs({ active, onChange }: NavTabsProps) {
  return (
    <nav className="flex gap-1 overflow-x-auto px-6 sm:px-10">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className="relative whitespace-nowrap px-3 py-3 text-sm font-medium text-ink-soft transition-colors hover:text-moss-deep"
        >
          <span className={active === tab.key ? 'text-moss-deep' : ''}>{tab.label}</span>
          {active === tab.key && (
            <motion.div
              layoutId="nav-underline"
              className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-moss"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
        </button>
      ))}
    </nav>
  )
}
