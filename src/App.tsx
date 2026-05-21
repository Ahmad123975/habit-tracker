import { useState, useCallback } from 'react'
import { useHabits } from './features/hooks/useHabits'
import { getWeekStart } from './features/utils/dateUtils'
import Header from './features/Components/Header'
import AddHabit from './features/Components/AddHabit'
import WeekNav from './features/Components/WeekNav'
import EmptyState from './features/Components/EmptyState'
import HabitGrid from './features/Components/HabitGrid'


export const App = () => {
  const { habits, checks, addHabit, deleteHabit, renameHabit, toggleCheck, getBestStreak } = useHabits()
  const [weekStart, setWeekStart] = useState<Date>(() => getWeekStart(new Date()))

  const goToPrev = useCallback(() => {
    setWeekStart(prev => {
      const d = new Date(prev)
      d.setDate(d.getDate() - 7)
      return d
    })
  }, [])

  const goToNext = useCallback(() => {
    setWeekStart(prev => {
      const d = new Date(prev)
      d.setDate(d.getDate() + 7)
      return d
    })
  }, [])

  const goToToday = useCallback(() => {
    setWeekStart(getWeekStart(new Date()))
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Header habitCount={habits.length} bestStreak={getBestStreak()} />

        <div style={{ padding: '24px 28px' }}>
          <AddHabit onAdd={addHabit} />

          <WeekNav
            weekStart={weekStart}
            onPrev={goToPrev}
            onNext={goToNext}
            onToday={goToToday}
          />

          {habits.length === 0 ? (
            <EmptyState />
          ) : (
            <HabitGrid
              habits={habits}
              checks={checks}
              weekStart={weekStart}
              onToggle={toggleCheck}
              onDelete={deleteHabit}
              onRename={renameHabit}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App