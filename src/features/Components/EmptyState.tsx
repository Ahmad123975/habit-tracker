export default function EmptyState() {
  return (
    <div style={{
      textAlign: 'center', padding: '60px 24px',
    }}>
      <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.15 }}>◈</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-dim)', marginBottom: 8 }}>
        No habits yet
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-faint)' }}>
        Add your first habit above to get started
      </div>
    </div>
  )
}