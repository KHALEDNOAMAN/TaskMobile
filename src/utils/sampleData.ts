import { Task, Habit, Achievement, WeeklyStats } from '../types';
import { getTodayString } from './helpers';

// ── Helper: generate consecutive dates ending on a given date ──

function consecutiveDates(endDate: string, count: number): string[] {
  const dates: string[] = [];
  const end = new Date(endDate);
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

function daysFromNow(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().split('T')[0];
}

const today = getTodayString();

// ── Tasks ───────────────────────────────────────────────────

export const sampleTasks: Task[] = [
  {
    id: 't1',
    title: 'Review pull requests',
    description: 'Check the open PRs on the main repo and leave feedback.',
    priority: 'high',
    category: 'work',
    dueDate: today,
    completed: false,
    createdAt: daysAgo(2),
  },
  {
    id: 't2',
    title: 'Grocery shopping',
    description: 'Buy vegetables, fruits, chicken, and rice.',
    priority: 'medium',
    category: 'errands',
    dueDate: daysFromNow(1),
    completed: false,
    createdAt: daysAgo(1),
  },
  {
    id: 't3',
    title: 'Prepare presentation slides',
    description: 'Q3 progress deck for the team standup meeting.',
    priority: 'high',
    category: 'work',
    dueDate: daysFromNow(2),
    completed: false,
    createdAt: daysAgo(3),
  },
  {
    id: 't4',
    title: 'Read Clean Code chapter 5',
    description: 'Continue reading about formatting and clean functions.',
    priority: 'low',
    category: 'learning',
    dueDate: daysFromNow(5),
    completed: false,
    createdAt: daysAgo(5),
  },
  {
    id: 't5',
    title: 'Pay electricity bill',
    description: 'Due amount for July. Pay via the banking app.',
    priority: 'high',
    category: 'finance',
    dueDate: daysAgo(1),
    completed: false,
    createdAt: daysAgo(7),
  },
  {
    id: 't6',
    title: 'Call dentist for appointment',
    description: 'Schedule a cleaning for next month.',
    priority: 'medium',
    category: 'health',
    dueDate: daysFromNow(3),
    completed: true,
    createdAt: daysAgo(4),
  },
  {
    id: 't7',
    title: 'Update portfolio website',
    description: 'Add the latest project and refresh the about section.',
    priority: 'medium',
    category: 'personal',
    dueDate: daysFromNow(7),
    completed: true,
    createdAt: daysAgo(10),
  },
  {
    id: 't8',
    title: 'Team dinner reservation',
    description: 'Book a table for 6 at the Italian restaurant downtown.',
    priority: 'low',
    category: 'social',
    dueDate: daysFromNow(4),
    completed: false,
    createdAt: daysAgo(1),
  },
];

// ── Habits ──────────────────────────────────────────────────

export const sampleHabits: Habit[] = [
  {
    id: 'h1',
    title: 'Morning Exercise',
    category: 'fitness',
    icon: '🏃',
    streak: 12,
    bestStreak: 18,
    completedDates: consecutiveDates(today, 12),
    color: '#14b8a6',
  },
  {
    id: 'h2',
    title: 'Read 30 min',
    category: 'learning',
    icon: '📖',
    streak: 8,
    bestStreak: 14,
    completedDates: consecutiveDates(today, 8),
    color: '#3b82f6',
  },
  {
    id: 'h3',
    title: 'Drink 8 Glasses',
    category: 'health',
    icon: '💧',
    streak: 21,
    bestStreak: 21,
    completedDates: consecutiveDates(today, 21),
    color: '#10b981',
  },
  {
    id: 'h4',
    title: 'Code 1 Hour',
    category: 'productivity',
    icon: '💻',
    streak: 15,
    bestStreak: 22,
    completedDates: consecutiveDates(today, 15),
    color: '#8b5cf6',
  },
  {
    id: 'h5',
    title: 'Meditate',
    category: 'mindfulness',
    icon: '🧘',
    streak: 5,
    bestStreak: 10,
    completedDates: consecutiveDates(daysAgo(1), 5), // not yet done today
    color: '#a78bfa',
  },
  {
    id: 'h6',
    title: 'Journal',
    category: 'productivity',
    icon: '✍️',
    streak: 3,
    bestStreak: 7,
    completedDates: consecutiveDates(daysAgo(1), 3), // not yet done today
    color: '#f59e0b',
  },
];

// ── Achievements ────────────────────────────────────────────

export const sampleAchievements: Achievement[] = [
  {
    id: 'a1',
    title: 'First Step',
    description: 'Complete your first task.',
    icon: '🎯',
    unlockedAt: daysAgo(30),
    requirement: 'Complete 1 task',
  },
  {
    id: 'a2',
    title: 'Streak Starter',
    description: 'Reach a 7-day streak on any habit.',
    icon: '🔥',
    unlockedAt: daysAgo(14),
    requirement: '7-day streak',
  },
  {
    id: 'a3',
    title: 'Habit Machine',
    description: 'Reach a 21-day streak on any habit.',
    icon: '⚡',
    unlockedAt: today,
    requirement: '21-day streak',
  },
  {
    id: 'a4',
    title: 'Centurion',
    description: 'Complete 100 tasks total.',
    icon: '🏆',
    unlockedAt: null, // locked
    requirement: 'Complete 100 tasks',
  },
  {
    id: 'a5',
    title: 'Zen Master',
    description: 'Meditate for 30 consecutive days.',
    icon: '🧘',
    unlockedAt: null, // locked
    requirement: '30-day meditation streak',
  },
];

// ── Weekly Stats ────────────────────────────────────────────

function mondayOfWeeksAgo(weeksAgo: number): string {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  d.setDate(diff - weeksAgo * 7);
  return d.toISOString().split('T')[0];
}

export const sampleWeeklyStats: WeeklyStats[] = [
  {
    weekStart: mondayOfWeeksAgo(3),
    tasksCompleted: 12,
    habitsCompleted: 28,
    streakDays: 5,
  },
  {
    weekStart: mondayOfWeeksAgo(2),
    tasksCompleted: 15,
    habitsCompleted: 35,
    streakDays: 7,
  },
  {
    weekStart: mondayOfWeeksAgo(1),
    tasksCompleted: 10,
    habitsCompleted: 32,
    streakDays: 6,
  },
  {
    weekStart: mondayOfWeeksAgo(0),
    tasksCompleted: 8,
    habitsCompleted: 24,
    streakDays: 4,
  },
];
