import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  goal: number;
  onChangeGoal: (goal: number) => void;
};

const goals = [5000, 8000, 10000, 12000];

export default function GoalSelector({ goal, onChangeGoal }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose daily goal</Text>

      <View style={styles.buttons}>
        {goals.map((item) => {
          const isActive = item === goal;

          return (
            <TouchableOpacity
              key={item}
              style={[styles.button, isActive && styles.activeButton]}
              onPress={() => onChangeGoal(item)}
            >
              <Text style={[styles.buttonText, isActive && styles.activeButtonText]}>
                {item / 1000}k
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#061A4A',
    marginBottom: 14,
  },

  buttons: {
    flexDirection: 'row',
    gap: 10,
  },

  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
  },

  activeButton: {
    backgroundColor: '#00D5B5',
  },

  buttonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#061A4A',
  },

  activeButtonText: {
    color: '#FFFFFF',
  },
});