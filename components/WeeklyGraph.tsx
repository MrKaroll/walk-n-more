import { View, Text, StyleSheet } from 'react-native';

type Props = {
  history: Record<string, number>;
};

export default function WeeklyGraph({ history }: Props) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const values = Object.values(history);
  const maxValue = Math.max(...values, 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Weekly Activity
      </Text>

      <View style={styles.chart}>
        {days.map((day, index) => {
          const value = values[index] || 0;

          return (
            <View
              key={day}
              style={styles.column}
            >
              <View
                style={[
                  styles.bar,
                  {
                    height:
                      Math.max(
                        8,
                        (value / maxValue) * 120
                      ),
                  },
                ]}
              />

              <Text style={styles.day}>
                {day}
              </Text>
            </View>
          );
        })}
      </View>
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

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#061A4A',
    marginBottom: 20,
  },

  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },

  column: {
    alignItems: 'center',
  },

  bar: {
    width: 22,
    borderRadius: 12,
    backgroundColor: '#00D5B5',
  },

  day: {
    marginTop: 8,
    fontSize: 12,
    color: '#6B7280',
  },
});