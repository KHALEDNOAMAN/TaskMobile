import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Task } from '../types';
import {
  PRIORITY_COLORS,
  CATEGORY_COLORS,
  CATEGORY_ICONS,
  getDueDateText,
  daysRemaining,
} from '../utils/helpers';

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  const overdue = !task.completed && daysRemaining(task.dueDate) < 0;
  const dueDays = daysRemaining(task.dueDate);

  return (
    <View style={[styles.container, task.completed && styles.completedContainer]}>
      {/* Priority bar */}
      <View
        style={[
          styles.priorityBar,
          { backgroundColor: PRIORITY_COLORS[task.priority] },
        ]}
      />

      <View style={styles.content}>
        <View style={styles.topRow}>
          {/* Checkbox */}
          <TouchableOpacity
            onPress={() => onToggle(task.id)}
            style={[
              styles.checkbox,
              task.completed && styles.checkboxDone,
            ]}
            activeOpacity={0.7}
          >
            {task.completed && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>

          <View style={styles.textBlock}>
            <Text
              style={[styles.title, task.completed && styles.titleDone]}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            {task.description !== '' && (
              <Text style={styles.description} numberOfLines={1}>
                {task.description}
              </Text>
            )}
          </View>

          {/* Delete */}
          <TouchableOpacity
            onPress={() => onDelete(task.id)}
            style={styles.deleteBtn}
            activeOpacity={0.6}
          >
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom meta row */}
        <View style={styles.metaRow}>
          {/* Category tag */}
          <View
            style={[
              styles.categoryTag,
              {
                backgroundColor:
                  (CATEGORY_COLORS[task.category] || '#8b5cf6') + '22',
              },
            ]}
          >
            <Text style={styles.categoryIcon}>
              {CATEGORY_ICONS[task.category] || '📌'}
            </Text>
            <Text
              style={[
                styles.categoryText,
                {
                  color: CATEGORY_COLORS[task.category] || '#8b5cf6',
                },
              ]}
            >
              {task.category}
            </Text>
          </View>

          {/* Priority badge */}
          <View style={styles.priorityBadge}>
            <View
              style={[
                styles.priorityDot,
                { backgroundColor: PRIORITY_COLORS[task.priority] },
              ]}
            />
            <Text style={styles.priorityText}>{task.priority}</Text>
          </View>

          {/* Due date */}
          <Text
            style={[
              styles.dueText,
              overdue && styles.dueTextOverdue,
              dueDays === 0 && !task.completed && styles.dueTextToday,
            ]}
          >
            {getDueDateText(task.dueDate)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#111827',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    overflow: 'hidden',
    // shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  completedContainer: {
    opacity: 0.6,
  },
  priorityBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 14,
    paddingLeft: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4b5563',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxDone: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  textBlock: {
    flex: 1,
  },
  title: {
    color: '#f1f5f9',
    fontSize: 16,
    fontWeight: '600',
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  description: {
    color: '#94a3b8',
    fontSize: 13,
    marginTop: 2,
  },
  deleteBtn: {
    padding: 4,
    marginLeft: 8,
  },
  deleteText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 8,
  },
  categoryTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
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
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  priorityText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  dueText: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 'auto',
  },
  dueTextOverdue: {
    color: '#ef4444',
    fontWeight: '700',
  },
  dueTextToday: {
    color: '#f59e0b',
    fontWeight: '700',
  },
});
