import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  progress: number;
  steps: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function ProgressRing({ progress, steps }: Props) {
  const size = 190;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const animatedProgress = useRef(new Animated.Value(0)).current;
  const clampedProgress = Math.min(progress, 1);

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: clampedProgress,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, [clampedProgress]);

  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E6F2FF"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <AnimatedCircle
          stroke="#00D5B5"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={styles.center}>
        <Text style={styles.steps}>{steps}</Text>
        <Text style={styles.label}>steps</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 190,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
  },
  steps: {
    fontSize: 42,
    fontWeight: '900',
    color: '#061A4A',
  },
  label: {
    marginTop: 4,
    fontSize: 15,
    color: '#6B7280',
  },
});