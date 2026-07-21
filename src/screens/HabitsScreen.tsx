import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Habit } from '../types';
import { useAppData } from '../hooks/useAppData';
import HabitItem from '../components/HabitItem';
import { formatDate, getTodayString } from '../utils/helpers';

export default function HabitsScreen() {
  const {
    habits,
    toggleHabitToday,
    isHabitDoneToday,
    habitsCompletedToday,
  } = useAppData();

  const today = getTodayString();

  // Sort by streak for leaderboard
  const sortedByStreak = [...habits].sort((a, b) => b.streak - a.streak);

  const renderHabit = ({ item }: { item: Habit }) => (
    <HabitItem
      habit={item}
      isDoneToday={isHabitDoneToday(item)}
      onToggle={toggleHabitToday}
    />
  );

  const ListHeader = () => (
    <View>
      {/* Date header */}
      <View style={styles.dateHeader}>
        <Text style={styles.dateLabel}>Today</Text>
        <Text style={styles.dateValue}>{formatDate(today)}</Text>
      </View>

      {/* Progress card */}
      <View style={styles.progressCard}>
        <View style={styles.progressTop}>
          <Text style={styles.progressTitle}>Daily Progress</Text>
          <Text style={styles.progressCount}>
            <Text style={styles.progressDone}>{habitsCompletedToday}</Text>
            /{habits.length}
          </Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width:
                  habits.length > 0
                    ? `${(habitsCompletedToday / habits.length) * 100}%`
                    : '0%',
              },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {habitsCompletedToday === habits.length
            ? '🎉 All habits completed today!'
            : `${habits.length - habitsCompletedToday} habits remaining`}
        </Text>
      </View>

      {/* Section title */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Daily Habits</Text>
        <Text style={styles.sectionEmoji}>📋</Text>
      </View>
    </View>
  );

  const ListFooter = () => (
    <View>
      {/* Streak Leaderboard */}
      <View style={styles.leaderboardSection}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>🏆 Streak Leaderboard</Text>
        </View>
        {sortedByStreak.map((habit, index) => (
          <View key={habit.id} style={styles.leaderRow}>
            <Text style={styles.leaderRank}>
              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
            </Text>
            <Text style={styles.leaderIcon}>{habit.icon}</Text>
            <Text style={styles.leaderTitle} numberOfLines={1}>
              {habit.title}
            </Text>
            <View style={styles.leaderStreakBadge}>
              <Text style={styles.leaderFire}>🔥</Text>
              <Text style={styles.leaderStreakNum}>{habit.streak}</Text>
            </View>
            <View style={styles.leaderBestBadge}>
              <Text style={styles.leaderBestLabel}>Best</Text>
              <Text style={styles.leaderBestNum}>{habit.bestStreak}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e1a" />
      <FlatList
        data={habits}
        renderItem={renderHabit}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0a0e1a',
  },
  listContent: {
    paddingBottom: 32,
  },
  dateHeader: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  dateLabel: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  dateValue: {
    color: '#f1f5f9',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 2,
  },
  // Progress card
  progressCard: {
    backgroundColor: '#111827',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: '700',
  },
  progressCount: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '700',
  },
  progressDone: {
    color: '#10b981',
    fontSize: 20,
    fontWeight: '800',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#1e293b',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#10b981',
    borderRadius: 4,
  },
  progressLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  // Section
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionEmoji: {
    fontSize: 18,
  },
  // Leaderboard
  leaderboardSection: {
    marginTop: 20,
    paddingTop: 16,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111827',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 14,
    borderRadius: 14,
  },
  leaderRank: {
    fontSize: 18,
    width: 30,
    textAlign: 'center',
  },
  leaderIcon: {
    fontSize: 20,
    marginHorizontal: 8,
  },
  leaderTitle: {
    flex: 1,
    color: '#f1f5f9',
    fontSize: 14,
    fontWeight: '600',
  },
  leaderStreakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  leaderFire: {
    fontSize: 12,
    marginRight: 3,
  },
  leaderStreakNum: {
    color: '#f97316',
    fontSize: 14,
    fontWeight: '800',
  },
  leaderBestBadge: {
    alignItems: 'center',
  },
  leaderBestLabel: {
    color: '#64748b',
    fontSize: 9,
    fontWeight: '600',
  },
  leaderBestNum: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '700',
  },
});
