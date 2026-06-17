import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { ThemeColors } from '../constants/theme';

type Props = {
  goal: number;
  onChangeGoal: (goal: number) => void;
  colors: ThemeColors;
};

const goals = [5000, 8000, 10000, 12000];

export default function GoalSelector({ goal, onChangeGoal, colors }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectGoal = (newGoal: number) => {
    onChangeGoal(newGoal);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsOpen((current) => !current)}
      >
        <View>
          <Text style={[styles.label, { color: colors.muted }]}>Daily goal</Text>

          <Text style={[styles.selectedValue, { color: colors.text }]}>
            {goal.toLocaleString()} steps
          </Text>
        </View>

        <Text style={[styles.arrow, { color: colors.accent }]}>
          {isOpen ? '▲' : '▼'}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.options}>
          {goals.map((item) => {
            const isActive = item === goal;

            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.option,
                  { backgroundColor: colors.option },
                  isActive && { backgroundColor: colors.accent },
                ]}
                onPress={() => handleSelectGoal(item)}
              >
                <Text
                  style={[
                    styles.optionText,
                    { color: colors.text },
                    isActive && { color: colors.white },
                  ]}
                >
                  {item.toLocaleString()} steps
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderRadius: 24,
    padding: 16,
  },

  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
  },

  selectedValue: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '900',
  },

  arrow: {
    fontSize: 18,
    fontWeight: '900',
  },

  options: {
    marginTop: 14,
    gap: 8,
  },

  option: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
  },

  optionText: {
    fontSize: 15,
    fontWeight: '800',
  },
});