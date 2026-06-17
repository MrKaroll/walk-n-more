import { View, Text, StyleSheet } from 'react-native';

type Props = {
  steps: number;
  goal: number;
};

export default function DailyGoalCard({ steps, goal }: Props) {
  const progress = Math.min(steps / goal, 1);
  const percentage = Math.round(progress * 100);
  const isCompleted = steps >= goal;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Goal</Text>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>

      <Text style={styles.steps}>
        {steps} / {goal} steps
      </Text>

      <View style={styles.progressBackground}>
        <View style={[styles.progressFill, { width: `${percentage}%` }]} />
      </View>

      <Text style={styles.message}>
        {isCompleted ? 'Goal completed 🎉' : 'Keep going, you are doing great'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#061A4A',
  },

  percentage: {
    fontSize: 18,
    fontWeight: '800',
    color: '#00D5B5',
  },

  steps: {
    marginTop: 10,
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '600',
  },

  progressBackground: {
    marginTop: 16,
    height: 14,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#00D5B5',
    borderRadius: 999,
  },

  message: {
    marginTop: 14,
    fontSize: 14,
    color: '#061A4A',
    fontWeight: '600',
  },
});