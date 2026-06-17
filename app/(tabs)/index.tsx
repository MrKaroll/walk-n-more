import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TouchableOpacity, NativeModules, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import ProgressRing from '../../components/ProgressRing';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WeeklyGraph from '../../components/WeeklyGraph';
import DailyGoalCard from '../../components/DailyGoalCard';
import GoalSelector from '../../components/GoalSelector';

export default function HomeScreen() {
  const [steps, setSteps] = useState(0);
  const [history, setHistory] = useState<Record<string, number>>({});
  const [goal, setGoal] = useState(8000);

  const stepLengthMeters = 0.75;
  const caloriesPerStep = 0.04;

  const distanceKm = ((steps * stepLengthMeters) / 1000).toFixed(1);
  const calories = Math.round(steps * caloriesPerStep);

useEffect(() => {
  const loadGoal = async () => {
    try {
      const storedGoal = await AsyncStorage.getItem('dailyGoal');

      if (storedGoal) {
        setGoal(Number(storedGoal));
      }
    } catch (error) {
      console.log(error);
    }
  };

  loadGoal();
}, []);

  // 1. Päris sammude lugemine telefoni sensorist
  useEffect(() => {
    const stepModule =
      NativeModules.StepModule ||
      NativeModules.StepCounter ||
      NativeModules.StepCounterModule;

    if (!stepModule) {
      console.log('Step module not found');
      console.log(Object.keys(NativeModules));
      return;
    }

    const loadSteps = async () => {
      try {
        let nativeSteps = 0;

        if (typeof stepModule.getSteps === 'function') {
          nativeSteps = await stepModule.getSteps();
        } else if (typeof stepModule.getStepCount === 'function') {
          nativeSteps = await stepModule.getStepCount();
        } else {
          console.log('No getSteps or getStepCount function found');
          console.log(stepModule);
          return;
        }

        setSteps(nativeSteps);
      } catch (error) {
        console.log('Failed to load steps:', error);
      }
    };

    loadSteps();

    const interval = setInterval(() => {
      loadSteps();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 2. History laadimine
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await AsyncStorage.getItem('stepHistory');

        if (stored) {
          setHistory(JSON.parse(stored));
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadHistory();
  }, []);

  // 3. Tänase päeva sammude salvestamine
  useEffect(() => {
    const saveHistory = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];

        const updatedHistory = {
          ...history,
          [today]: steps,
        };

        setHistory(updatedHistory);
        await AsyncStorage.setItem('stepHistory', JSON.stringify(updatedHistory));
      } catch (error) {
        console.log(error);
      }
    };

    saveHistory();
  }, [steps]);

const handleChangeGoal = async (newGoal: number) => {
  try {
    setGoal(newGoal);
    await AsyncStorage.setItem('dailyGoal', String(newGoal));
  } catch (error) {
    console.log(error);
  }
};

  return (
    <LinearGradient colors={['#E8FDF8', '#EEF3FF']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Walk N More</Text>

          <ProgressRing steps={steps} goal={goal} />

          <DailyGoalCard steps={steps} goal={goal} />

          <GoalSelector goal={goal} onChangeGoal={handleChangeGoal} />

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{distanceKm} km</Text>
              <Text style={styles.statLabel}>Distance</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statValue}>{calories}</Text>
              <Text style={styles.statLabel}>Calories</Text>
            </View>
          </View>

          <WeeklyGraph history={history} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },

  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#061A4A',
    marginBottom: 24,
  },

  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 24,
    alignItems: 'center',
  },

  cardLabel: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 20,
  },

  goalText: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: '700',
    color: '#008CFF',
  },

  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 14,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
  },

  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#061A4A',
  },

  statLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 6,
  },

  motivationCard: {
    backgroundColor: '#EEF7FF',
    borderRadius: 24,
    padding: 22,
    marginTop: 18,
  },

  motivationTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#061A4A',
  },

  motivationText: {
    fontSize: 15,
    color: '#4B5563',
    marginTop: 8,
  },

  primaryButton: {
    height: 58,
    borderRadius: 22,
    backgroundColor: '#061A4A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },

  brandBlock: {
    alignItems: 'center',
    marginBottom: 22,
  },

  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#061A4A',
  },

  brandTagline: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '800',
    color: '#008CFF',
    letterSpacing: 1.2,
  },
});