import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import type { ThemeColors } from '../constants/theme';

type Props = {
  steps: number;
  goal: number;
  colors: ThemeColors;
};

const size = 230;
const strokeWidth = 18;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

export default function ProgressRing({ steps, goal, colors }: Props) {
  const progress = Math.min(steps / goal, 1);
  const percentage = Math.round(progress * 100);
  const strokeDashoffset = circumference - progress * circumference;
  const isCompleted = steps >= goal;

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View style={styles.ringWrapper}>
        <Svg width={size} height={size}>
          <Circle
            stroke={colors.border}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />

          <Circle
            stroke={isCompleted ? colors.accent : colors.secondary}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            rotation="-90"
            originX={size / 2}
            originY={size / 2}
          />
        </Svg>

        <View style={styles.centerContent}>
          <Text style={[styles.steps, { color: colors.text }]}>{steps}</Text>
          <Text style={[styles.stepsLabel, { color: colors.muted }]}>steps today</Text>

          <Text style={[styles.goalText, { color: colors.secondary }]}>
            {steps} / {goal}
          </Text>

          <Text style={[styles.percentage, { color: colors.accent }]}>
            {percentage}%
          </Text>
        </View>
      </View>

      <Text style={[styles.message, { color: colors.text }]}>
        {isCompleted ? 'Daily goal completed' : 'Keep going'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
  },

  ringWrapper: {
    width: size,
    height: size,
    alignItems: 'center',
    justifyContent: 'center',
  },

  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  steps: {
    fontSize: 44,
    fontWeight: '900',
  },

  stepsLabel: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: '700',
  },

  goalText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '800',
  },

  percentage: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '900',
  },

  message: {
    marginTop: 18,
    fontSize: 15,
    fontWeight: '800',
  },
});