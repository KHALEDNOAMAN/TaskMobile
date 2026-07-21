export type Priority = 'high' | 'medium' | 'low';

export type HabitCategory =
  | 'health'
  | 'productivity'
  | 'learning'
  | 'fitness'
  | 'mindfulness';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: string;
  dueDate: string; // ISO date string YYYY-MM-DD
  completed: boolean;
  createdAt: string; // ISO date string
}

export interface Habit {
  id: string;
  title: string;
  category: HabitCategory;
  icon: string; // emoji
  streak: number;
  bestStreak: number;
  completedDates: string[]; // ISO date strings YYYY-MM-DD
  color: string; // hex color
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji
  unlockedAt: string | null; // ISO date string or null if locked
  requirement: string;
}

export interface WeeklyStats {
  weekStart: string; // ISO date string YYYY-MM-DD (Monday)
  tasksCompleted: number;
  habitsCompleted: number;
  streakDays: number;
}

export type TaskFilter = 'all' | 'active' | 'completed' | 'overdue';
export type TaskSort = 'dueDate' | 'priority' | 'title' | 'createdAt';
