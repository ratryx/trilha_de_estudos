import { motion } from 'framer-motion'

interface ProgressRingProps {
  value: number
  total: number
  size?: number
}

export function ProgressRing({ value, total, size = 132 }: ProgressRingProps) {
  const pct = total > 0 ? value / total : 0
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-sand)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - pct) }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl text-moss-deep">{Math.round(pct * 100)}%</span>
        <span className="text-xs text-ink-soft">
          {value}/{total}
        </span>
      </div>
    </div>
  )
}
