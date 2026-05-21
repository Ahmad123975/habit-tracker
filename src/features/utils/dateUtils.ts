export function getWeekStart(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = day === 0 ? -6 : 1 - day
  d.setDate(d.getDate() + diff)
  d.setHours(0, 0, 0, 0)
  return d
}

export function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + i)
    return d
  })
}

export function toKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function isToday(date: Date): boolean {
  return toKey(date) === toKey(new Date())
}

export function isFuture(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d > today
}

export function shortDay(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()
}

export function dayNum(date: Date): number {
  return date.getDate()
}

export function shortMonth(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short' })
}

export function formatWeekRange(weekStart: Date): string {
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + 6)
  const startMonth = shortMonth(weekStart)
  const endMonth = shortMonth(weekEnd)
  if (startMonth === endMonth) {
    return `${startMonth} ${dayNum(weekStart)} – ${dayNum(weekEnd)}, ${weekStart.getFullYear()}`
  }
  return `${startMonth} ${dayNum(weekStart)} – ${endMonth} ${dayNum(weekEnd)}, ${weekStart.getFullYear()}`
}

export function calculateStreak(habitId: string, checks: Record<string, boolean>): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  let streak = 0
  const cursor = new Date(today)
  if (!checks[`${habitId}::${toKey(today)}`]) {
    cursor.setDate(cursor.getDate() - 1)
  }
  for (let i = 0; i < 365; i++) {
    if (checks[`${habitId}::${toKey(cursor)}`]) {
      streak++
      cursor.setDate(cursor.getDate() - 1)
    } else break
  }
  return streak
}

export function isCurrentWeek(weekStart: Date): boolean {
  return toKey(weekStart) === toKey(getWeekStart(new Date()))
}

export function isFutureWeek(weekStart: Date): boolean {
  return weekStart > getWeekStart(new Date())
}

export function formatTodayLong(): string {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  })
}

export function getWeekNumber(): number {
  const d = new Date()
  d.setHours(0,0,0,0)
  d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7)
  const week1 = new Date(d.getFullYear(), 0, 4)
  return 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7)
}