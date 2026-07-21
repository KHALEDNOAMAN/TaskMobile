import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import { useAppData } from '../hooks/useAppData';

interface SettingsItemProps {
  icon: string;
  label: string;
  subtitle?: string;
  onPress?: () => void;
}

function SettingsItem({ icon, label, subtitle, onPress }: SettingsItemProps) {
  return (
    <TouchableOpacity
      style={styles.settingsItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.settingsIcon}>{icon}</Text>
      <View style={styles.settingsText}>
        <Text style={styles.settingsLabel}>{label}</Text>
        {subtitle && <Text style={styles.settingsSubtitle}>{subtitle}</Text>}
      </View>
      <Text style={styles.settingsArrow}>›</Text>
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { levelInfo, totalXP, unlockedAchievements, totalTasksDone, totalStreakDays } =
    useAppData();

  const handlePress = (item: string) => {
    Alert.alert(item, `${item} settings coming soon!`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0e1a" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Avatar & Name */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarInitials}>KN</Text>
          </View>
          <Text style={styles.name}>Khaled Noaman</Text>
          <Text style={styles.memberSince}>Member since July 2025</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Lv {levelInfo.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#8b5cf6' }]}>
              {totalXP}
            </Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: '#f59e0b' }]}>
              {unlockedAchievements}
            </Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
        </View>

        {/* Quick Stats Cards */}
        <View style={styles.quickStats}>
          <View style={styles.quickCard}>
            <Text style={styles.quickIcon}>✅</Text>
            <Text style={styles.quickValue}>{totalTasksDone}</Text>
            <Text style={styles.quickLabel}>Tasks Done</Text>
          </View>
          <View style={styles.quickCard}>
            <Text style={styles.quickIcon}>🔥</Text>
            <Text style={styles.quickValue}>{totalStreakDays}</Text>
            <Text style={styles.quickLabel}>Streak Days</Text>
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelTitle}>
              🏅 Level {levelInfo.level}
            </Text>
            <Text style={styles.levelNext}>
              Level {levelInfo.level + 1}
            </Text>
          </View>
          <View style={styles.levelBarBg}>
            <View
              style={[
                styles.levelBarFill,
                { width: `${Math.min(levelInfo.progress * 100, 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.levelXP}>
            {levelInfo.currentXP} / {levelInfo.xpForNext} XP
          </Text>
        </View>

        {/* Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsGroup}>
          <SettingsItem
            icon="🔔"
            label="Notifications"
            subtitle="Manage reminders & alerts"
            onPress={() => handlePress('Notifications')}
          />
          <SettingsItem
            icon="🎨"
            label="Theme"
            subtitle="Dark mode"
            onPress={() => handlePress('Theme')}
          />
          <SettingsItem
            icon="📤"
            label="Data Export"
            subtitle="Export your data as JSON"
            onPress={() => handlePress('Data Export')}
          />
          <SettingsItem
            icon="ℹ️"
            label="About"
            subtitle="TaskMobile v1.0.0"
            onPress={() => handlePress('About')}
          />
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Made with 💜 by Khaled
        </Text>
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
    paddingBottom: 32,
  },
  // Profile header
  profileHeader: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 20,
  },
  avatarLarge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    // glow
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  avatarInitials: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
  },
  name: {
    color: '#f1f5f9',
    fontSize: 24,
    fontWeight: '800',
  },
  memberSince: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 4,
  },
  // Stats row
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#f1f5f9',
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#1e293b',
  },
  // Quick stats
  quickStats: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  quickCard: {
    flex: 1,
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  quickIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  quickValue: {
    color: '#f1f5f9',
    fontSize: 24,
    fontWeight: '800',
  },
  quickLabel: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  // Level card
  levelCard: {
    backgroundColor: '#111827',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#8b5cf633',
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  levelTitle: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '700',
  },
  levelNext: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
  },
  levelBarBg: {
    height: 10,
    backgroundColor: '#1e293b',
    borderRadius: 5,
    overflow: 'hidden',
  },
  levelBarFill: {
    height: 10,
    backgroundColor: '#8b5cf6',
    borderRadius: 5,
  },
  levelXP: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
    textAlign: 'center',
  },
  // Settings
  sectionTitle: {
    color: '#f1f5f9',
    fontSize: 18,
    fontWeight: '800',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  settingsGroup: {
    marginHorizontal: 16,
    backgroundColor: '#111827',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  settingsIcon: {
    fontSize: 22,
    marginRight: 14,
  },
  settingsText: {
    flex: 1,
  },
  settingsLabel: {
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '600',
  },
  settingsSubtitle: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 1,
  },
  settingsArrow: {
    color: '#4b5563',
    fontSize: 22,
    fontWeight: '700',
  },
  // Footer
  footer: {
    color: '#4b5563',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '500',
  },
});
