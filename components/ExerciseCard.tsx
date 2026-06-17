import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { ThemeColors } from '../constants/theme';

type Props = {
  isActive: boolean;
  exerciseSteps: number;
  exerciseDistanceKm: string;
  exerciseCalories: number;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
  colors: ThemeColors;
};

export default function ExerciseCard({
  isActive,
  exerciseSteps,
  exerciseDistanceKm,
  exerciseCalories,
  onStart,
  onStop,
  onReset,
  colors,
}: Props) {
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Exercise Walk</Text>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: colors.border },
            isActive && { backgroundColor: colors.accent },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: colors.muted },
              isActive && { color: colors.white },
            ]}
          >
            {isActive ? 'Active' : 'Stopped'}
          </Text>
        </View>
      </View>

      <Text style={[styles.steps, { color: colors.text }]}>{exerciseSteps}</Text>
      <Text style={[styles.label, { color: colors.muted }]}>exercise steps</Text>

      <View style={styles.statsRow}>
        <View style={[styles.statBox, { backgroundColor: colors.cardAlt }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {exerciseDistanceKm} km
          </Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Distance</Text>
        </View>

        <View style={[styles.statBox, { backgroundColor: colors.cardAlt }]}>
          <Text style={[styles.statValue, { color: colors.text }]}>
            {exerciseCalories}
          </Text>
          <Text style={[styles.statLabel, { color: colors.muted }]}>Calories</Text>
        </View>
      </View>

      <View style={styles.buttons}>
        {!isActive ? (
          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: colors.accent }]}
            onPress={onStart}
          >
            <Text style={[styles.mainButtonText, { color: colors.white }]}>
              Start Exercise
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.mainButton, { backgroundColor: colors.danger }]}
            onPress={onStop}
          >
            <Text style={[styles.mainButtonText, { color: colors.white }]}>
              Stop Exercise
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.resetButton, { backgroundColor: colors.border }]}
          onPress={onReset}
        >
          <Text style={[styles.resetButtonText, { color: colors.text }]}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
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
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '800',
  },

  steps: {
    marginTop: 18,
    fontSize: 42,
    fontWeight: '900',
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },

  statBox: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
  },

  statValue: {
    fontSize: 17,
    fontWeight: '900',
  },

  statLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
  },

  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },

  mainButton: {
    flex: 1,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainButtonText: {
    fontSize: 15,
    fontWeight: '900',
  },

  resetButton: {
    width: 90,
    height: 52,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  resetButtonText: {
    fontSize: 15,
    fontWeight: '900',
  },
});