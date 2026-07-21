import { useState, useCallback, useMemo } from 'react';
import { Task, Habit, Achievement, WeeklyStats, TaskFilter } from '../types';
import {
  sampleTasks,
  sampleHabits,
  sampleAchievements,
  sampleWeeklyStats,
} from '../utils/sampleData';
import {
  getTodayString,
  isOverdue,
  calculateXP,
  getLevelFromXP,
  getLast7Days,
} from '../utils/helpers';

export function useAppData() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [habits, setHabits] = useState<Habit[]>(sampleHabits);
  const [achievements] = useState<Achievement[]>(sampleAchievements);
  const [weeklyStats] = useState<WeeklyStats[]>(sampleWeeklyStats);
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all');

  const today = getTodayString();

  // ── Task CRUD ───────────────────────────────────────────

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: `t_${Date.now()}`,
      completed: false,
      createdAt: today,
    };
    setTasks(prev => [newTask, ...prev]);
  }, [today]);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  // ── Habit toggle ────────────────────────────────────────

  const toggleHabitToday = useCallback(
    (id: string) => {
      setHabits(prev =>
        prev.map(h => {
          if (h.id !== id) return h;

          const alreadyDone = h.completedDates.includes(today);
          let newCompleted: string[];
          let newStreak: number;

          if (alreadyDone) {
            // un-complete today
            newCompleted = h.completedDates.filter(d => d !== today);
            // recalculate streak from yesterday backward
            newStreak = 0;
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            let check = yesterday;
            while (
              newCompleted.includes(check.toISOString().split('T')[0])
            ) {
              newStreak++;
              check.setDate(check.getDate() - 1);
            }
          } else {
            // complete today
            newCompleted = [...h.completedDates, today];
            // streak = consecutive days ending today
            newStreak = 0;
            let check = new Date();
            while (
              newCompleted.includes(check.toISOString().split('T')[0])
            ) {
              newStreak++;
              check.setDate(check.getDate() - 1);
            }
          }

          return {
            ...h,
            completedDates: newCompleted,
            streak: newStreak,
            bestStreak: Math.max(h.bestStreak, newStreak),
          };
        }),
      );
    },
    [today],
  );

  const isHabitDoneToday = useCallback(
    (habit: Habit) => habit.completedDates.includes(today),
    [today],
  );

  // ── Filtered tasks ──────────────────────────────────────

  const filteredTasks = useMemo(() => {
    switch (taskFilter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      case 'overdue':
        return tasks.filter(t => isOverdue(t.dueDate, t.completed));
      default:
        return tasks;
    }
  }, [tasks, taskFilter]);

  // ── Analytics ───────────────────────────────────────────

  const totalTasksDone = useMemo(
    () => tasks.filter(t => t.completed).length,
    [tasks],
  );

  const todayTasksCount = useMemo(
    () => tasks.filter(t => t.dueDate === today).length,
    [tasks, today],
  );

  const todayTasksDone = useMemo(
    () => tasks.filter(t => t.dueDate === today && t.completed).length,
    [tasks, today],
  );

  const totalStreakDays = useMemo(
    () => habits.reduce((sum, h) => sum + h.streak, 0),
    [habits],
  );

  const habitsCompletedToday = useMemo(
    () => habits.filter(h => h.completedDates.includes(today)).length,
    [habits, today],
  );

  const unlockedAchievements = useMemo(
    () => achievements.filter(a => a.unlockedAt !== null).length,
    [achievements],
  );

  const totalXP = useMemo(
    () => calculateXP(totalTasksDone, totalStreakDays, unlockedAchievements),
    [totalTasksDone, totalStreakDays, unlockedAchievements],
  );

  const levelInfo = useMemo(() => getLevelFromXP(totalXP), [totalXP]);

  const productivityScore = useMemo(() => {
    const taskScore = tasks.length > 0 ? (totalTasksDone / tasks.length) * 100 : 0;
    const habitScore =
      habits.length > 0 ? (habitsCompletedToday / habits.length) * 100 : 0;
    return Math.round((taskScore + habitScore) / 2);
  }, [tasks, totalTasksDone, habits, habitsCompletedToday]);

  // daily completion counts for the last 7 days (for chart)
  const dailyCompletions = useMemo(() => {
    const last7 = getLast7Days();
    return last7.map(day => {
      const tasksDone = tasks.filter(
        t => t.completed && t.dueDate === day,
      ).length;
      const habitsDone = habits.filter(h =>
        h.completedDates.includes(day),
      ).length;
      return { day, count: tasksDone + habitsDone };
    });
  }, [tasks, habits]);

  const maxDailyCompletion = useMemo(
    () => Math.max(...dailyCompletions.map(d => d.count), 1),
    [dailyCompletions],
  );

  // habit completion rates
  const habitCompletionRates = useMemo(
    () =>
      habits.map(h => {
        const last7 = getLast7Days();
        const done = last7.filter(d => h.completedDates.includes(d)).length;
        return { habit: h, rate: done / 7 };
      }),
    [habits],
  );

  return {
    // Tasks
    tasks,
    filteredTasks,
    taskFilter,
    setTaskFilter,
    addTask,
    toggleTask,
    deleteTask,

    // Habits
    habits,
    toggleHabitToday,
    isHabitDoneToday,
    habitsCompletedToday,

    // Analytics
    achievements,
    weeklyStats,
    totalTasksDone,
    todayTasksCount,
    todayTasksDone,
    totalStreakDays,
    unlockedAchievements,
    totalXP,
    levelInfo,
    productivityScore,
    dailyCompletions,
    maxDailyCompletion,
    habitCompletionRates,
  };
}
