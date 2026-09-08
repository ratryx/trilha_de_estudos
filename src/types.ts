export interface StudyDay {
  id: number
  date: string
  week: number
  subject: string
  area: string
  priority: 'ALTA' | 'MEDIA' | 'BAIXA'
  observation: string | null
}

export interface Rule {
  item: string
  decision: string
}

export type TabKey = 'trilha' | 'visao-geral' | 'prioridades' | 'regras'
