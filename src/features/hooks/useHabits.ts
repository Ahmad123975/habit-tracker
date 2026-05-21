import { useState, useCallback } from 'react'
import { calculateStreak } from '../utils/dateUtils'

export interface Habit {
  id: string
  name: string
  createdAt: string
}

export type Checks = Record<string, boolean>

function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem('ht_habits')
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function loadChecks(): Checks {
  try {
    const raw = localStorage.getItem('ht_checks')
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function saveHabits(habits: Habit[]) {
  localStorage.setItem('ht_habits', JSON.stringify(habits))
}

function saveChecks(checks: Checks) {
  localStorage.setItem('ht_checks', JSON.stringify(checks))
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits)
  const [checks, setChecks] = useState<Checks>(loadChecks)

  const addHabit = useCallback((name: string) => {
    const trimmed = name.trim()
    if (!trimmed) return
    const id = `h_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
    const newHabit: Habit = { id, name: trimmed, createdAt: new Date().toISOString() }
    setHabits(prev => {
      const next = [...prev, newHabit]
      saveHabits(next)
      return next
    })
  }, [])

  const deleteHabit = useCallback((id: string) => {
    setHabits(prev => {
      const next = prev.filter(h => h.id !== id)
      saveHabits(next)
      return next
    })
  }, [])

  const renameHabit = useCallback((id: string, newName: string) => {
    const trimmed = newName.trim()
    if (!trimmed) return
    setHabits(prev => {
      const next = prev.map(h => h.id === id ? { ...h, name: trimmed } : h)
      saveHabits(next)
      return next
    })
  }, [])

  const toggleCheck = useCallback((habitId: string, dateKey: string) => {
    setChecks(prev => {
      const key = `${habitId}::${dateKey}`
      const next = { ...prev, [key]: !prev[key] }
      if (!next[key]) delete next[key]
      saveChecks(next)
      return next
    })
  }, [])

  const isChecked = useCallback((habitId: string, dateKey: string): boolean => {
    return !!checks[`${habitId}::${dateKey}`]
  }, [checks])

  const getBestStreak = useCallback((): number => {
    if (habits.length === 0) return 0
    return Math.max(...habits.map(h => calculateStreak(h.id, checks)))
  }, [habits, checks])

  return {
    habits,
    checks,
    addHabit,
    deleteHabit,
    renameHabit,
    toggleCheck,
    isChecked,
    getBestStreak,
  }
}