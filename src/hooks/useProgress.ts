import { useCallback, useRef, useState } from 'react'
import { scheduleData } from '../data/schedule'

const STORAGE_KEY = 'pontape-inicial:concluidos'
const validIds = new Set(scheduleData.map((day) => day.id))
function loadInitial(): Set<number> {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return new Set(Array.isArray(raw) ? raw.filter((id): id is number => typeof id === 'number' && validIds.has(id)) : [])
  } catch { return new Set() }
}
export function useProgress() {
  const [done, setDone] = useState<Set<number>>(loadInitial)
  const currentDone = useRef(done)
  const [storageError, setStorageError] = useState(false)
  const toggle = useCallback((id: number) => {
    if (!validIds.has(id)) return
    const next = new Set(currentDone.current)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    currentDone.current = next
    setDone(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      setStorageError(false)
    } catch { setStorageError(true) }
  }, [])
  const isDone = useCallback((id: number) => done.has(id), [done])
  return { done, toggle, isDone, count: done.size, storageError }
}
