import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'pontape-inicial:concluidos'

function loadInitial(): Set<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as number[]
    return new Set(arr)
  } catch {
    return new Set()
  }
}

// Tracks which study days the user has marked as done. Persisted locally
// today; swap the two effect bodies below for Supabase calls later without
// touching any component that consumes this hook.
export function useProgress() {
  const [done, setDone] = useState<Set<number>>(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...done]))
  }, [done])

  const toggle = useCallback((id: number) => {
    setDone((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const isDone = useCallback((id: number) => done.has(id), [done])

  return { done, toggle, isDone, count: done.size }
}
