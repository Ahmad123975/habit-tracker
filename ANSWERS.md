# Assessment Answers

## 1. How to Run

Requirements: Node.js 


npm install
npm run dev


App runs at `http://localhost:5173`. No environment variables needed.

Deployed URL: *(not deployed yet)*

---

## 2. Stack & Design Choices

**Stack:** React + TypeScript + Vite

React was the natural choice — component-based structure maps cleanly to this UI (grid, header, nav are all isolated pieces). TypeScript catches prop mismatches early, especially useful for the `checks` record shape. Vite gives instant HMR so iteration is fast.

**Decision 1 — Weekly grid over a list:**
I chose a table-based weekly grid (habits as rows, days as columns) because habit tracking is fundamentally about pattern recognition across time. A list would show today only. The grid lets the user glance left-to-right and immediately see gaps in their week — that's the core value of a habit tracker.

**Decision 2 — Today's column always highlighted:**
Friday's column gets a distinct color and border so the user never has to mentally find where they are. The eye goes directly to today the moment the app opens. This affects `HabitGrid.tsx` — the `isToday()` check applies a separate background and border-bottom on the column header and each cell in that column.

**Week starts Monday** because it maps to how most people think about their week — workdays on the left, weekend on the right. A natural mental model for building habits around a weekly routine.

**Streak logic:** Streak counts up to today if today is checked, otherwise counts back from yesterday. This avoids penalizing the user for not yet checking off today — the day is not over yet.

---

## 3. Responsive & Accessibility

**Narrow (360px phone):** The grid sits inside a horizontally scrollable container (`overflow-x: auto`). The habit name column stays pinned on the left while the user scrolls through day columns. The add-habit input takes full width and the header stats wrap naturally.

**Wide (1440px laptop):** Layout is constrained to `max-width: 900px` centered on screen. Prevents the grid from stretching awkwardly on large displays.

**Accessibility handled:**
- Every checkmark button has `aria-label` (habit name + date + checked state) and `aria-pressed` for screen readers
- Add habit input has `aria-label="New habit name"`
- `button:focus-visible` and `input:focus-visible` show a visible outline for keyboard navigation

**Accessibility skipped:**
- `aria-live` announcements when a habit is added or streak updates. A screen reader user gets no audio feedback on toggle. Skipped due to time — would add `aria-live="polite"` on the streak column in a follow-up.

---

## 4. AI Usage

**Tool used:** ChatGPT

**Where AI was used:**
- CSS variable system and initial color theme setup
- `dateUtils.ts` helper functions (getWeekStart, formatWeekRange)

**What I changed:**

The streak logic AI gave me was always counting backward from yesterday, regardless of whether today was checked. So if I ticked today, the streak number would not update until tomorrow — which felt broken. I fixed it by checking today first and only stepping back to yesterday if today is unmarked:

```ts
if (!checks[`${habitId}::${toKey(today)}`]) {
  cursor.setDate(cursor.getDate() - 1)
}
```

AI also suggested a generic purple color scheme. I replaced it with a clean light theme — warm white background, purple accent for today, green for checked cells, amber for streaks. Each color has a clear meaning rather than being decorative.

---

## 5. Honest Gap

The app has no animation when a checkmark is toggled. The state changes instantly but there is no micro-interaction — no scale pulse, no color fade — that makes the "win" moment feel satisfying.

With another day, I would add a brief keyframe animation on the checkmark button when it transitions to checked:

```css
@keyframes pop {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.25); }
  100% { transform: scale(1); }
}
```

This would make each check feel rewarding — which is the core psychology behind habit tracking apps.