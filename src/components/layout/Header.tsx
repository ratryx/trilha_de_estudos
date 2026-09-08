interface HeaderProps {
  nextSubject: string | null
}

export function Header({ nextSubject }: HeaderProps) {
  return (
    <header className="border-b border-sand px-6 py-6 sm:px-10 sm:py-8">
      <h1 className="font-display text-3xl text-moss-deep sm:text-4xl">Trilha de estudos</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Semanas 1 a 14, o pontapé inicial até o fim das aulas.
      </p>
      {nextSubject && (
        <p className="mt-2 max-w-md text-sm text-ink-soft">
          Próximo passo: <span className="text-ink">{nextSubject}</span>
        </p>
      )}
    </header>
  )
}
