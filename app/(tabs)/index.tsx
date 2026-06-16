import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TouchableOpacity, NativeModules } from 'react-native';
import { useEffect, useState } from 'react';
import ProgressRing from '../../components/ProgressRing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [steps, setSteps] = useState(0);
  const [history, setHistory] = useState<Record<string, number>>({});
  const goal = 8000;

  // 1. Sammude lugemine
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const value = await NativeModules.StepModule.getSteps();
        setSteps(value);
      } catch (error) {
        console.log('StepModule error:', error);
      }
    }, 1000);

    return () => clearInterval(interval);
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

  // 3. Tänase päeva salvestamine
  useEffect(() => {
    const saveTodaySteps = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];

        const stored =
          await AsyncStorage.getItem('stepHistory');

        const historyData =
          stored ? JSON.parse(stored) : {};

        historyData[today] = steps;

        await AsyncStorage.setItem(
          'stepHistory',
          JSON.stringify(historyData)
        );

        setHistory(historyData);
      } catch (error) {
        console.log(error);
      }
    };

    if (steps > 0) {
      saveTodaySteps();
    }
  }, [steps]);

  return (

    <LinearGradient
      colors={['#F3FFF8', '#EEF9FF', '#F7F9FC']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <Text style={styles.title}>Walk N More</Text>

      <View style={styles.heroCard}>

        <View style={styles.brandBlock}>
          <Text style={styles.brandTitle}>Walk N More</Text>

          <Text style={styles.brandTagline}>
            WALK • RESET • BE BETTER
          </Text>
        </View>

        <Text style={styles.cardLabel}>Daily steps</Text>

<ProgressRing
  progress={steps / goal}
  steps={steps}
/>

        <Text style={styles.goalText}>
          Goal: {goal}
        </Text>
      </View>


      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>0.9 km</Text>
          <Text style={styles.statLabel}>Distance</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>48 kcal</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
      </View>

      <View style={styles.motivationCard}>
        <Text style={styles.motivationTitle}>
          One step at a time.
        </Text>

        <Text style={styles.motivationText}>
          Small walks still count.
        </Text>
      </View>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>
          Start walking
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    padding: 24,
    paddingTop: 70,
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