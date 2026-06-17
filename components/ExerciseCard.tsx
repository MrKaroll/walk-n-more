import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  isActive: boolean;
  exerciseSteps: number;
  exerciseDistanceKm: string;
  exerciseCalories: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
};

export default function ExerciseCard({
  isActive,
  exerciseSteps,
  exerciseDistanceKm,
  exerciseCalories,
  onStart,
  onStop,
  onReset,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercise Walk</Text>

        <View style={[styles.statusBadge, isActive && styles.activeBadge]}>
          <Text style={[styles.statusText, isActive && styles.activeStatusText]}>
            {isActive ? 'Active' : 'Stopped'}
          </Text>
        </View>
      </View>

      <Text style={styles.steps}>{exerciseSteps}</Text>
      <Text style={styles.label}>exercise steps</Text>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>{exerciseDistanceKm} km</Text>
          <Text style={styles.statLabel}>Distance</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statValue}>{exerciseCalories}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        {!isActive ? (
          <TouchableOpacity style={styles.startButton} onPress={onStart}>
            <Text style={styles.startButtonText}>Start Exercise</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.stopButton} onPress={onStop}>
            <Text style={styles.stopButtonText}>Stop Exercise</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.resetButton} onPress={onReset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
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

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
  },

  activeBadge: {
    backgroundColor: '#00D5B5',
  },

  statusText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6B7280',
  },

  activeStatusText: {
    color: '#FFFFFF',
  },

  steps: {
    marginTop: 18,
    fontSize: 42,
    fontWeight: '900',
    color: '#061A4A',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6B7280',
    marginTop: 2,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },

  statBox: {
    flex: 1,
    backgroundColor: '#F3F7FF',
    borderRadius: 18,
    padding: 14,
  },

  statValue: {
    fontSize: 17,
    fontWeight: '900',
    color: '#061A4A',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
  },

  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },

  startButton: {
    flex: 1,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#00D5B5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  startButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  stopButton: {
    flex: 1,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#FF5A5F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
  },

  resetButton: {
    width: 90,
    height: 52,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  resetButtonText: {
    color: '#061A4A',
    fontSize: 15,
    fontWeight: '900',
  },
});