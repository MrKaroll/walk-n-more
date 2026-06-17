import { View, Text, StyleSheet } from 'react-native';

type Props = {
  history: Record<string, number>;
};

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getLast7Days() {
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const key = getLocalDateKey(date);

    const label = date.toLocaleDateString('en-US', {
      weekday: 'short',
    });

    days.push({ key, label });
  }

  return days;
}

export default function WeeklyGraph({ history }: Props) {
  const days = getLast7Days();

  const values = days.map((day) => history[day.key] || 0);
  const maxValue = Math.max(...values, 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Activity</Text>

      <View style={styles.chart}>
        {days.map((day) => {
          const value = history[day.key] || 0;
          const height = value > 0 ? Math.max(8, (value / maxValue) * 120) : 8;

          return (
            <View key={day.key} style={styles.column}>
              <Text style={styles.value}>{value > 0 ? value : ''}</Text>

              <View
                style={[
                  styles.bar,
                  {
                    height,
                    opacity: value > 0 ? 1 : 0.25,
                  },
                ]}
              />

              <Text style={styles.day}>{day.label}</Text>
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
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#061A4A',
    marginBottom: 20,
  },

  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 175,
  },

  column: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },

  value: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 6,
    height: 14,
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
    fontWeight: '600',
  },
});