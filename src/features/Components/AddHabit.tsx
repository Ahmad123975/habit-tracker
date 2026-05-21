import { useState } from 'react'

interface Props {
  onAdd: (name: string) => void
}

export default function AddHabit({ onAdd }: Props) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onAdd(value.trim())
      setValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex', gap: 8, marginBottom: 20,
    }}>
      <input
        type="text"
        placeholder="New habit… e.g. Read 30 min, Exercise, Meditate"
        value={value}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        maxLength={60}
        aria-label="New habit name"
        style={{
          flex: 1,
          background: 'var(--surface)',
          border: `1px solid ${focused ? 'var(--accent-border)' : 'var(--border)'}`,
          borderRadius: 10,
          padding: '10px 16px',
          color: 'var(--text-muted)',
          fontSize: 13,
          transition: 'border-color 0.2s',
        }}
      />
      <button
        type="submit"
        disabled={!value.trim()}
        aria-label="Add habit"
        style={{
          background: 'var(--accent-bg)',
          border: '1px solid var(--accent-border)',
          borderRadius: 10,
          color: 'var(--accent)',
          fontSize: 22,
          width: 42,
          fontWeight: 300,
          opacity: value.trim() ? 1 : 0.4,
          transition: 'opacity 0.2s',
        }}
      >+</button>
    </form>
  )
}