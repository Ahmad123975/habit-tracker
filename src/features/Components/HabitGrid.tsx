import { useState } from 'react'
import {
  getWeekDays, toKey, isToday, isFuture,
  shortDay, dayNum, calculateStreak
} from '../utils/dateUtils'
import type { Checks, Habit } from '../hooks/useHabits'

interface Props {
  habits: Habit[]
  checks: Checks
  weekStart: Date
  onToggle: (habitId: string, dateKey: string) => void
  onDelete: (id: string) => void
  onRename: (id: string, name: string) => void
}

export default function HabitGrid({ habits, checks, weekStart, onToggle, onDelete, onRename }: Props) {
  const days = getWeekDays(weekStart)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const startEdit = (habit: Habit) => {
    setEditingId(habit.id)
    setEditValue(habit.name)
  }

  const commitEdit = (id: string) => {
    if (editValue.trim()) onRename(id, editValue.trim())
    setEditingId(null)
  }

  const thStyle: React.CSSProperties = {
    fontSize: 10, color: 'var(--text-dim)',
    letterSpacing: '0.1em', textAlign: 'center',
    paddingBottom: 10, minWidth: 44,
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ ...thStyle, textAlign: 'left', minWidth: 140, paddingRight: 12 }}>HABIT</th>
            {days.map(d => (
              <th key={d.toISOString()} style={{
                ...thStyle,
                color: isToday(d) ? 'var(--accent)' : 'var(--text-dim)',
              }}>
                {shortDay(d)}
                <span style={{
                  display: 'block', fontSize: 15, fontWeight: 600, marginTop: 3,
                  color: isToday(d) ? 'var(--accent)' : 'var(--text-dim)',
                }}>{dayNum(d)}</span>
              </th>
            ))}
            <th style={{ ...thStyle, minWidth: 52 }}>STREAK</th>
          </tr>
        </thead>
        <tbody>
          {habits.map(habit => {
            const streak = calculateStreak(habit.id, checks)
            return (
              <tr key={habit.id}>
                <td style={{ borderTop: '1px solid var(--border2)', padding: '8px 12px 8px 0' }}>
                  {editingId === habit.id ? (
                    <input
                      autoFocus
                      value={editValue}
                      onChange={e => setEditValue(e.target.value)}
                      onBlur={() => commitEdit(habit.id)}
                      onKeyDown={e => e.key === 'Enter' && commitEdit(habit.id)}
                      style={{
                        background: 'var(--surface)', border: '1px solid var(--accent-border)',
                        borderRadius: 6, padding: '4px 8px', color: 'var(--text-muted)',
                        fontSize: 13, width: '100%',
                      }}
                    />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span
                        onDoubleClick={() => startEdit(habit)}
                        style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', cursor: 'text' }}
                        title="Double click to rename"
                      >{habit.name}</span>
                      <button
                        onClick={() => onDelete(habit.id)}
                        aria-label={`Delete ${habit.name}`}
                        style={{
                          background: 'none', border: 'none', color: 'var(--text-faint)',
                          fontSize: 11, cursor: 'pointer', padding: '2px 4px',
                          borderRadius: 4, opacity: 0.6,
                        }}
                      >✕</button>
                    </div>
                  )}
                </td>

                {days.map(d => {
                  const key = toKey(d)
                  const checked = !!checks[`${habit.id}::${key}`]
                  const today = isToday(d)
                  const future = isFuture(d)

                  return (
                    <td key={key} style={{
                      borderTop: '1px solid var(--border2)',
                      background: today ? 'var(--today-col)' : 'transparent',
                      padding: 4, textAlign: 'center',
                    }}>
                      <button
                        onClick={() => !future && onToggle(habit.id, key)}
                        aria-label={`${habit.name} ${key} ${checked ? 'checked' : 'unchecked'}`}
                        aria-pressed={checked}
                        style={{
                          width: 32, height: 32, borderRadius: 8, margin: 'auto',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 13,
                          cursor: future ? 'default' : 'pointer',
                          opacity: future ? 0.2 : 1,
                          background: checked
                            ? (today ? 'var(--today-on-bg)' : 'var(--check-on-bg)')
                            : (today ? 'var(--today-bg)' : 'var(--surface2)'),
                          border: `1px solid ${checked
                            ? (today ? 'var(--today-on-border)' : 'var(--check-on-border)')
                            : (today ? 'var(--today-border)' : 'var(--border)')}`,
                          color: checked
                            ? (today ? 'var(--accent)' : 'var(--check-on-color)')
                            : 'transparent',
                          transition: 'all 0.15s',
                        }}
                      >✓</button>
                    </td>
                  )
                })}

                <td style={{
                  borderTop: '1px solid var(--border2)',
                  textAlign: 'center', padding: '4px 8px',
                }}>
                  {streak > 0 ? (
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--streak-color)', fontFamily: 'var(--font-mono)' }}>
                      🔥 {streak}
                    </span>
                  ) : (
                    <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>—</span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}