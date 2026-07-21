import { Priority, HabitCategory } from '../types';

// ── Color Maps ──────────────────────────────────────────────

export const PRIORITY_COLORS: Record<Priority, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

export const CATEGORY_COLORS: Record<string, string> = {
  work: '#8b5cf6',
  personal: '#06b6d4',
  health: '#10b981',
  finance: '#f59e0b',
  learning: '#3b82f6',
  social: '#ec4899',
  errands: '#f97316',
  fitness: '#14b8a6',
};

export const HABIT_CATEGORY_COLORS: Record<HabitCategory, string> = {
  health: '#10b981',
  productivity: '#8b5cf6',
  learning: '#3b82f6',
  fitness: '#14b8a6',
  mindfulness: '#a78bfa',
};

export const CATEGORY_ICONS: Record<string, string> = {
  work: '💼',
  personal: '🏠',
  health: '💚',
  finance: '💰',
  learning: '📚',
  social: '👥',
  errands: '🛒',
  fitness: '💪',
};

export const HABIT_CATEGORY_ICONS: Record<HabitCategory, string> = {
  health: '💚',
  productivity: '⚡',
  learning: '📖',
  fitness: '🏋️',
  mindfulness: '🧘',
};

// ── Date Helpers ────────────────────────────────────────────

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

export function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function daysRemaining(dueDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);
  const diff = due.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function isOverdue(dueDate: string, completed: boolean): boolean {
  return !completed && daysRemaining(dueDate) < 0;
}

export function getDueDateText(dueDate: string): string {
  const days = daysRemaining(dueDate);
  if (days < 0) return `${Math.abs(days)}d overdue`;
  if (days === 0) return 'Due today';
  if (days === 1) return 'Due tomorrow';
  return `${days}d left`;
}

/** Return the last 7 days as YYYY-MM-DD strings, oldest first. */
export function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

export function getDayLabel(dateStr: string): string {
  const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return labels[new Date(dateStr).getDay()];
}

// ── XP / Level System ───────────────────────────────────────

export function calculateXP(
  tasksCompleted: number,
  totalStreakDays: number,
  achievementsUnlocked: number,
): number {
  return tasksCompleted * 10 + totalStreakDays * 5 + achievementsUnlocked * 50;
}

export function getLevelFromXP(xp: number): {
  level: number;
  currentXP: number;
  xpForNext: number;
  progress: number;
} {
  // Each level requires progressively more XP
  let level = 1;
  let remaining = xp;
  let threshold = 100;

  while (remaining >= threshold) {
    remaining -= threshold;
    level++;
    threshold = level * 100;
  }

  return {
    level,
    currentXP: remaining,
    xpForNext: threshold,
    progress: remaining / threshold,
  };
}

// ── Greeting ────────────────────────────────────────────────

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export const MOTIVATIONAL_QUOTES = [
  "Small steps every day lead to big results. 🚀",
  "Consistency beats intensity. Keep going! 💪",
  "You're building something amazing. 🌟",
  "Every habit completed is a vote for your future self. ✨",
  "Progress, not perfection. 🎯",
  "Today is a fresh start. Make it count! 🔥",
];

export function getRandomQuote(): string {
  return MOTIVATIONAL_QUOTES[
    Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)
  ];
}
