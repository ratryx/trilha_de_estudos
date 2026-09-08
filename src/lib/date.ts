const WEEKDAY_SHORT = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb']
const MONTH_SHORT = [
  'jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez',
]

function parse(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatDayMonth(dateStr: string): string {
  const d = parse(dateStr)
  return `${d.getDate()} ${MONTH_SHORT[d.getMonth()]}`
}

export function formatWeekday(dateStr: string): string {
  const d = parse(dateStr)
  return WEEKDAY_SHORT[d.getDay()]
}

export function isToday(dateStr: string): boolean {
  const d = parse(dateStr)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

export function isPast(dateStr: string): boolean {
  const d = parse(dateStr)
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return d.getTime() < now.getTime()
}
