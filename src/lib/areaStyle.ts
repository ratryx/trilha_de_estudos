// Each area gets a stable hue drawn from the moss/ice palette so the same
// subject reads consistently across the trail, the breakdown chart and the
// priorities list.
const PALETTE: Record<string, { dot: string; bg: string; text: string }> = {
  'Clínica de Pequenos': { dot: '#5B7351', bg: '#EAF0E5', text: '#3A4A32' },
  SUS: { dot: '#A9762F', bg: '#F3E9D8', text: '#7A5824' },
  'Clínica de Equinos e Ruminantes': { dot: '#6E8A63', bg: '#ECF1E6', text: '#43552E' },
  'Patologia Animal': { dot: '#8B6F47', bg: '#F1E9DB', text: '#5E4A2E' },
  'Patologia Clínica': { dot: '#4E7A6B', bg: '#E4EFEC', text: '#33534A' },
  Cirurgia: { dot: '#9A5B4A', bg: '#F3E4DF', text: '#6B3D31' },
  Semiologia: { dot: '#6B7C9A', bg: '#E7EBF2', text: '#3E4A63' },
  Anestesiologia: { dot: '#7B6B9A', bg: '#EBE6F2', text: '#4E4363' },
  Farmacologia: { dot: '#4E8A7A', bg: '#E3F0EB', text: '#2F5A4C' },
  'Diagnóstico por Imagem': { dot: '#B08A3E', bg: '#F5EBD6', text: '#7A5F24' },
}

const FALLBACK = { dot: '#5B7351', bg: '#EAF0E5', text: '#3A4A32' }

export function areaStyle(area: string) {
  return PALETTE[area] ?? FALLBACK
}

export function allAreas(): string[] {
  return Object.keys(PALETTE)
}
