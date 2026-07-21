import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { Achievement } from '../types';

interface Props {
  achievement: Achievement;
}

export default function AchievementBadge({ achievement }: Props) {
  const [showDetail, setShowDetail] = useState(false);
  const unlocked = achievement.unlockedAt !== null;

  return (
    <>
      <TouchableOpacity
        style={[styles.badge, !unlocked && styles.badgeLocked]}
        onPress={() => setShowDetail(true)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.iconCircle,
            unlocked && styles.iconCircleUnlocked,
          ]}
        >
          <Text style={styles.icon}>
            {unlocked ? achievement.icon : '🔒'}
          </Text>
        </View>
        <Text
          style={[styles.title, !unlocked && styles.titleLocked]}
          numberOfLines={2}
        >
          {achievement.title}
        </Text>
      </TouchableOpacity>

      {/* Detail Modal */}
      <Modal
        visible={showDetail}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDetail(false)}
      >
        <TouchableOpacity
          style={styles.detailOverlay}
          activeOpacity={1}
          onPress={() => setShowDetail(false)}
        >
          <View style={styles.detailCard}>
            <Text style={styles.detailIcon}>{achievement.icon}</Text>
            <Text style={styles.detailTitle}>{achievement.title}</Text>
            <Text style={styles.detailDesc}>{achievement.description}</Text>
            <View style={styles.detailDivider} />
            <Text style={styles.detailReq}>
              📋 {achievement.requirement}
            </Text>
            {unlocked ? (
              <Text style={styles.detailUnlocked}>
                ✅ Unlocked
              </Text>
            ) : (
              <Text style={styles.detailLocked}>🔒 Locked</Text>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  badgeLocked: {
    opacity: 0.45,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  iconCircleUnlocked: {
    backgroundColor: '#8b5cf622',
    borderWidth: 2,
    borderColor: '#8b5cf6',
    // glow
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  icon: {
    fontSize: 26,
  },
  title: {
    color: '#f1f5f9',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  titleLocked: {
    color: '#64748b',
  },
  // Detail Modal
  detailOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  detailCard: {
    backgroundColor: '#111827',
    borderRadius: 24,
    padding: 28,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  detailIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  detailTitle: {
    color: '#f1f5f9',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  detailDesc: {
    color: '#94a3b8',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#1e293b',
    width: '100%',
    marginVertical: 16,
  },
  detailReq: {
    color: '#06b6d4',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailUnlocked: {
    color: '#10b981',
    fontSize: 14,
    fontWeight: '700',
  },
  detailLocked: {
    color: '#ef4444',
    fontSize: 14,
    fontWeight: '700',
  },
});
