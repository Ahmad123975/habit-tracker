import { formatWeekRange, isCurrentWeek } from '../utils/dateUtils'

interface Props {
  weekStart: Date
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

export default function WeekNav({ weekStart, onPrev, onNext, onToday }: Props) {
  const isCurrent = isCurrentWeek(weekStart)

  const btnStyle: React.CSSProperties = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 8,
    color: 'var(--text-dim)',
    fontSize: 13,
    padding: '6px 14px',
    cursor: 'pointer',
    transition: 'border-color 0.15s, color 0.15s',
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', marginBottom: 16,
    }}>
      <button style={btnStyle} onClick={onPrev}>← Prev</button>

      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {formatWeekRange(weekStart)}
        </div>
        {isCurrent ? (
          <span style={{
            display: 'inline-block', marginTop: 4, fontSize: 10,
            background: 'var(--accent-dark)', color: 'var(--accent)',
            border: '1px solid var(--accent-border)',
            borderRadius: 20, padding: '2px 10px', letterSpacing: '0.08em',
          }}>Current week</span>
        ) : (
          <button onClick={onToday} style={{
            display: 'inline-block', marginTop: 4, fontSize: 10,
            background: 'var(--surface)', color: 'var(--text-dim)',
            border: '1px solid var(--border)',
            borderRadius: 20, padding: '2px 10px', letterSpacing: '0.08em',
            cursor: 'pointer',
          }}>↩ Today</button>
        )}
      </div>

      <button style={btnStyle} onClick={onNext}>Next →</button>
    </div>
  )
}