import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { ThemeColors } from '../constants/theme';

type Props = {
  isDarkMode: boolean;
  onToggle: () => void;
  colors: ThemeColors;
};

export default function ThemeToggle({ isDarkMode, onToggle, colors }: Props) {
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <View>
        <Text style={[styles.label, { color: colors.muted }]}>Appearance</Text>
        <Text style={[styles.value, { color: colors.text }]}>
          {isDarkMode ? 'Dark mode' : 'Light mode'}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.toggle,
          {
            backgroundColor: isDarkMode ? colors.accent : colors.border,
          },
        ]}
        onPress={onToggle}
      >
        <View
          style={[
            styles.knob,
            {
              backgroundColor: colors.white,
              alignSelf: isDarkMode ? 'flex-end' : 'flex-start',
            },
          ]}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
  },

  value: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: '900',
  },

  toggle: {
    width: 58,
    height: 32,
    borderRadius: 999,
    padding: 4,
    justifyContent: 'center',
  },

  knob: {
    width: 24,
    height: 24,
    borderRadius: 999,
  },
});