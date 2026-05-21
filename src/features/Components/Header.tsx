import { formatTodayLong, getWeekNumber } from '../utils/dateUtils'

interface Props {
  habitCount: number
  bestStreak: number
}

export default function Header({ habitCount, bestStreak }: Props) {
  return (
    <div style={{
      background: 'var(--surface)',
      padding: '24px 28px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'var(--accent-dark)',
          border: '1px solid var(--accent-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, color: 'var(--accent)',
        }}>◈</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.03em' }}>
            Habit Tracker
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
            {formatTodayLong()} · Week {getWeekNumber()}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '8px 14px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent)' }}>{habitCount}</div>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.08em', marginTop: 1 }}>HABITS</div>
        </div>
        <div style={{
          background: 'var(--bg)', border: '1px solid var(--border)',
          borderRadius: 10, padding: '8px 14px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--streak-color)' }}>🔥 {bestStreak}</div>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: '0.08em', marginTop: 1 }}>BEST</div>
        </div>
      </div>
    </div>
  )
}