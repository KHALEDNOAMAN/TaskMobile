import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  icon: string;
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  accentColor?: string;
}

export default function StatCard({
  icon,
  label,
  value,
  trend,
  accentColor = '#8b5cf6',
}: Props) {
  const trendArrow =
    trend === 'up' ? '↑' : trend === 'down' ? '↓' : '';
  const trendColor =
    trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#94a3b8';

  return (
    <View style={[styles.card, { borderTopColor: accentColor }]}>
      <View style={styles.iconRow}>
        <Text style={styles.icon}>{icon}</Text>
        {trend && (
          <Text style={[styles.trend, { color: trendColor }]}>
            {trendArrow}
          </Text>
        )}
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    flex: 1,
    borderTopWidth: 3,
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  trend: {
    fontSize: 16,
    fontWeight: '800',
  },
  value: {
    color: '#f1f5f9',
    fontSize: 26,
    fontWeight: '800',
  },
  label: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
