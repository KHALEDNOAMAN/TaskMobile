import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Priority } from '../types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (task: {
    title: string;
    description: string;
    priority: Priority;
    category: string;
    dueDate: string;
  }) => void;
}

const PRIORITIES: Priority[] = ['high', 'medium', 'low'];
const PRIORITY_LABELS: Record<Priority, string> = {
  high: '🔴 High',
  medium: '🟡 Medium',
  low: '🟢 Low',
};

const CATEGORIES = [
  'work',
  'personal',
  'health',
  'finance',
  'learning',
  'social',
  'errands',
  'fitness',
];

export default function AddTaskModal({ visible, onClose, onSave }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('work');
  const [dueDate, setDueDate] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
    });
    // reset
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('work');
    setDueDate('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.modal}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>New Task ✨</Text>
              <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Title */}
              <Text style={styles.label}>Title</Text>
              <TextInput
                style={styles.input}
                placeholder="What do you need to do?"
                placeholderTextColor="#64748b"
                value={title}
                onChangeText={setTitle}
              />

              {/* Description */}
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Add some details…"
                placeholderTextColor="#64748b"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />

              {/* Priority */}
              <Text style={styles.label}>Priority</Text>
              <View style={styles.pillRow}>
                {PRIORITIES.map(p => (
                  <TouchableOpacity
                    key={p}
                    style={[
                      styles.pill,
                      priority === p && styles.pillActive,
                      priority === p && {
                        borderColor:
                          p === 'high'
                            ? '#ef4444'
                            : p === 'medium'
                            ? '#f59e0b'
                            : '#10b981',
                      },
                    ]}
                    onPress={() => setPriority(p)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        priority === p && styles.pillTextActive,
                      ]}
                    >
                      {PRIORITY_LABELS[p]}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Category */}
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryGrid}>
                {CATEGORIES.map(c => (
                  <TouchableOpacity
                    key={c}
                    style={[
                      styles.categoryChip,
                      category === c && styles.categoryChipActive,
                    ]}
                    onPress={() => setCategory(c)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        category === c && styles.categoryChipTextActive,
                      ]}
                    >
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Due Date */}
              <Text style={styles.label}>Due Date</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#64748b"
                value={dueDate}
                onChangeText={setDueDate}
                keyboardType="numbers-and-punctuation"
              />
            </ScrollView>

            {/* Buttons */}
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={onClose}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.saveBtn, !title.trim() && styles.saveBtnDisabled]}
                onPress={handleSave}
                activeOpacity={0.7}
                disabled={!title.trim()}
              >
                <Text style={styles.saveBtnText}>Save Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#0f172a',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#f1f5f9',
    fontSize: 22,
    fontWeight: '800',
  },
  closeBtn: {
    color: '#94a3b8',
    fontSize: 22,
    fontWeight: '700',
    padding: 4,
  },
  label: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 14,
    color: '#f1f5f9',
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#334155',
  },
  textArea: {
    minHeight: 80,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 10,
  },
  pill: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1e293b',
  },
  pillActive: {
    backgroundColor: '#1e293b',
  },
  pillText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
  },
  pillTextActive: {
    color: '#f1f5f9',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#1e293b',
  },
  categoryChipActive: {
    backgroundColor: '#8b5cf6',
  },
  categoryChipText: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  btnRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#1e293b',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#94a3b8',
    fontSize: 15,
    fontWeight: '700',
  },
  saveBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
});
