import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Habit } from '../types';
import { getLast7Days, HABIT_CATEGORY_ICONS } from '../utils/helpers';

interface Props {
  habit: Habit;
  isDoneToday: boolean;
  onToggle: (id: string) => void;
}

export default function HabitItem({ habit, isDoneToday, onToggle }: Props) {
  const last7 = getLast7Days();

  return (
    <View style={[styles.container, { borderLeftColor: habit.color }]}>
      <View style={styles.topRow}>
        {/* Icon */}
        <View style={[styles.iconCircle, { backgroundColor: habit.color + '22' }]}>
          <Text style={styles.icon}>{habit.icon}</Text>
        </View>

        {/* Title & category */}
        <View style={styles.info}>
          <Text style={styles.title}>{habit.title}</Text>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryIcon}>
              {HABIT_CATEGORY_ICONS[habit.category]}
            </Text>
            <Text style={[styles.categoryText, { color: habit.color }]}>
              {habit.category}
            </Text>
          </View>
        </View>

        {/* Streak badge */}
        <View style={styles.streakBadge}>
          <Text style={styles.fireEmoji}>🔥</Text>
          <Text style={styles.streakCount}>{habit.streak}</Text>
          <Text style={styles.streakLabel}>days</Text>
        </View>

        {/* Toggle button */}
        <TouchableOpacity
          onPress={() => onToggle(habit.id)}
          style={[
            styles.toggleBtn,
            isDoneToday && styles.toggleBtnDone,
            isDoneToday && { backgroundColor: habit.color },
          ]}
          activeOpacity={0.7}
        >
          <Text style={styles.toggleText}>{isDoneToday ? '✓' : ''}</Text>
        </TouchableOpacity>
      </View>

      {/* Weekly dots */}
      <View style={styles.weekRow}>
        {last7.map((day, idx) => {
          const done = habit.completedDates.includes(day);
          return (
            <View key={idx} style={styles.dayCol}>
              <View
                style={[
                  styles.dot,
                  done && { backgroundColor: habit.color },
                  !done && styles.dotEmpty,
                ]}
              />
              <Text style={styles.dayLabel}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(day).getDay()]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111827',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderLeftWidth: 4,
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '700',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  categoryIcon: {
    fontSize: 11,
    marginRight: 4,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  streakBadge: {
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#1e293b',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  fireEmoji: {
    fontSize: 14,
  },
  streakCount: {
    color: '#f97316',
    fontSize: 16,
    fontWeight: '800',
  },
  streakLabel: {
    color: '#94a3b8',
    fontSize: 9,
    fontWeight: '600',
  },
  toggleBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#4b5563',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleBtnDone: {
    borderColor: 'transparent',
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    paddingHorizontal: 8,
  },
  dayCol: {
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 4,
  },
  dotEmpty: {
    backgroundColor: '#1e293b',
  },
  dayLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '600',
  },
});
