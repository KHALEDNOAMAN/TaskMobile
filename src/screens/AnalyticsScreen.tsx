import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useAppData } from '../hooks/useAppData';
import StatCard from '../components/StatCard';
import AchievementBadge from '../components/AchievementBadge';
import { getDayLabel } from '../utils/helpers';

export default function AnalyticsScreen() {
  const {
    totalTasksDone,
    totalStreakDays,
    productivityScore,
    levelInfo,
    totalXP,
    dailyCompletions,
    maxDailyCompletion,
    habitCompletionRates,
    achievements,
  } = useAppData();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e1a" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title */}
        <Text style={styles.screenTitle}>Analytics 📊</Text>

        {/* Overview Cards */}
        <View style={styles.cardsRow}>
          <StatCard
            icon="✅"
            label="Tasks Done"
            value={totalTasksDone}
            trend="up"
            accentColor="#10b981"
          />
          <View style={styles.cardGap} />
          <StatCard
            icon="🔥"
            label="Total Streaks"
            value={`${totalStreakDays}d`}
            trend="up"
            accentColor="#f97316"
          />
        </View>
        <View style={styles.cardsRow}>
          <StatCard
            icon="⚡"
            label="Productivity"
            value={`${productivityScore}%`}
            trend={productivityScore >= 50 ? 'up' : 'down'}
            accentColor="#06b6d4"
          />
          <View style={styles.cardGap} />
          <StatCard
            icon="🏅"
            label="Level"
            value={levelInfo.level}
            accentColor="#8b5cf6"
          />
        </View>

        {/* XP Progress */}
        <View style={styles.xpCard}>
          <View style={styles.xpHeader}>
            <Text style={styles.xpTitle}>Experience Points</Text>
            <Text style={styles.xpValue}>
              {totalXP} <Text style={styles.xpLabel}>XP</Text>
            </Text>
          </View>
          <View style={styles.xpBarBg}>
            <View
              style={[
                styles.xpBarFill,
                { width: `${Math.min(levelInfo.progress * 100, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.xpProgress}>
            {levelInfo.currentXP} / {levelInfo.xpForNext} XP to Level{' '}
            {levelInfo.level + 1}
          </Text>
        </View>

        {/* This Week Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week</Text>
          <View style={styles.chartContainer}>
            {dailyCompletions.map((d, idx) => {
              const height = (d.count / maxDailyCompletion) * 100;
              return (
                <View key={idx} style={styles.barCol}>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          height: `${Math.max(height, 6)}%`,
                          backgroundColor:
                            d.count >= maxDailyCompletion * 0.7
                              ? '#10b981'
                              : d.count >= maxDailyCompletion * 0.3
                              ? '#06b6d4'
                              : '#8b5cf6',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.barCount}>{d.count}</Text>
                  <Text style={styles.barLabel}>
                    {getDayLabel(d.day)}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Habit Completion Rates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Habit Completion (7 days)</Text>
          {habitCompletionRates.map(({ habit, rate }) => (
            <View key={habit.id} style={styles.rateRow}>
              <Text style={styles.rateIcon}>{habit.icon}</Text>
              <Text style={styles.rateName} numberOfLines={1}>
                {habit.title}
              </Text>
              <View style={styles.rateBarBg}>
                <View
                  style={[
                    styles.rateBarFill,
                    {
                      width: `${rate * 100}%`,
                      backgroundColor: habit.color,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.ratePercent, { color: habit.color }]}>
                {Math.round(rate * 100)}%
              </Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements 🏆</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map(a => (
              <AchievementBadge key={a.id} achievement={a} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0a0e1a',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  screenTitle: {
    color: '#f1f5f9',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  cardsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  cardGap: {
    width: 12,
  },

  // XP card
  xpCard: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#8b5cf633',
  },
  xpHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  xpTitle: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '700',
  },
  xpValue: {
    color: '#8b5cf6',
    fontSize: 18,
    fontWeight: '800',
  },
  xpLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
  },
  xpBarBg: {
    height: 10,
    backgroundColor: '#1e293b',
    borderRadius: 5,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: 10,
    backgroundColor: '#8b5cf6',
    borderRadius: 5,
  },
  xpProgress: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },

  // Section
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },

  // Bar chart
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    paddingBottom: 8,
    height: 200,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
  },
  barTrack: {
    flex: 1,
    width: 24,
    borderRadius: 6,
    backgroundColor: '#1e293b',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: 6,
  },
  barCount: {
    color: '#f1f5f9',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 6,
  },
  barLabel: {
    color: '#64748b',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },

  // Habit rates
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#111827',
    borderRadius: 12,
    padding: 12,
  },
  rateIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  rateName: {
    color: '#f1f5f9',
    fontSize: 13,
    fontWeight: '600',
    width: 90,
  },
  rateBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: '#1e293b',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  rateBarFill: {
    height: 8,
    borderRadius: 4,
  },
  ratePercent: {
    fontSize: 13,
    fontWeight: '800',
    width: 40,
    textAlign: 'right',
  },

  // Achievements
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
  },
});
