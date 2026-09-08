# Trilha de estudos — Pontapé inicial

Dashboard interativa para acompanhar o cronograma de estudos (semanas 1 a 14),
gerada a partir da planilha `cronograma_pontape_inicial_semanas_1_a_14.xlsx`.

## Stack

- Vite + React + TypeScript (sem Next.js)
- Tailwind CSS v4
- Framer Motion

## Rodar localmente

```bash
npm install
npm run dev
```

## Gerar build de produção

```bash
npm run build
```

Os arquivos finais ficam em `dist/` — é um site estático, pode subir em
qualquer host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.), sem
depender de Node no servidor.

## Estrutura

```
src/
  data/          dados extraídos da planilha (schedule.ts, rules.ts)
  types.ts       tipos compartilhados
  lib/           helpers (cores por área, formatação de datas)
  hooks/         useProgress — progresso salvo em localStorage
  components/
    layout/      Header, NavTabs
    trail/       trilha semanal (WeekRow, DayNode, DayDetail)
    dashboard/   visão geral (Overview, AreaBreakdown, UpNext, StatBlock)
    priorities/  lista das 56 prioridades (busca + filtro por área)
    rules/       regras do cronograma
```

## Progresso e persistência

O progresso (quais dias já foram estudados) é salvo no `localStorage` do
navegador através do hook `useProgress` (`src/hooks/useProgress.ts`). Para
persistir isso no Supabase mais adiante (e sincronizar entre dispositivos),
basta trocar o corpo desse hook por chamadas à tabela do Supabase — nenhum
outro componente precisa mudar, já que todos consomem só `isDone`, `toggle`
e `count`.

## Próximos passos sugeridos

- Autenticação + tabela `progress` no Supabase para sincronizar entre dispositivos
- Editar o 56º assunto de "Clínica de Pequenos" (ainda marcado como [A DEFINIR]) direto em `src/data/schedule.ts`
- Notificações/lembretes do dia atual
