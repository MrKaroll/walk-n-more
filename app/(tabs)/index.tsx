import { useEffect, useRef, useState } from "react";
import { View, Text, NativeModules, Pressable } from "react-native";
import Svg, { Circle } from "react-native-svg";

const { StepModule } = NativeModules;

const DAILY_GOAL = 8000;
const CIRCLE_SIZE = 240;
const STROKE_WIDTH = 18;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export default function TabHomeScreen() {
  const [steps, setSteps] = useState<number>(0);
  const [todayKey, setTodayKey] = useState(getTodayKey());

  const lastDateRef = useRef(getTodayKey());

  const progress = Math.min(steps / DAILY_GOAL, 1);
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const loadSteps = () => {
    const currentDate = getTodayKey();

    if (currentDate !== lastDateRef.current) {
      lastDateRef.current = currentDate;
      setTodayKey(currentDate);
    }

    StepModule.getStepCount()
      .then((value: number) => setSteps(value))
      .catch(() => setSteps(0));
  };

  const resetSteps = () => {
    StepModule.resetTodaySteps()
      .then(() => loadSteps())
      .catch(() => setSteps(0));
  };

  useEffect(() => {
    loadSteps();

    const interval = setInterval(loadSteps, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f6f7fb",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 18, color: "#6b7280", marginBottom: 12 }}>
        {todayKey}
      </Text>

      <Text
        style={{
          fontSize: 30,
          color: "#111827",
          fontWeight: "700",
          marginBottom: 28,
        }}
      >
        Tänased sammud
      </Text>

      <View
        style={{
          width: CIRCLE_SIZE,
          height: CIRCLE_SIZE,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
          <Circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            stroke="#e5e7eb"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />

          <Circle
            cx={CIRCLE_SIZE / 2}
            cy={CIRCLE_SIZE / 2}
            r={RADIUS}
            stroke="#111827"
            strokeWidth={STROKE_WIDTH}
            fill="none"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            originX={CIRCLE_SIZE / 2}
            originY={CIRCLE_SIZE / 2}
          />
        </Svg>

        <View style={{ position: "absolute", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 52,
              fontWeight: "800",
              color: "#111827",
            }}
          >
            {steps}
          </Text>

          <Text style={{ fontSize: 16, color: "#6b7280" }}>
            / {DAILY_GOAL} sammu
          </Text>

          <Text
            style={{
              fontSize: 18,
              color: "#111827",
              fontWeight: "600",
              marginTop: 6,
            }}
          >
            {Math.round(progress * 100)}%
          </Text>
        </View>
      </View>

      <Pressable
        onPress={resetSteps}
        style={{
          backgroundColor: "#111827",
          paddingVertical: 14,
          paddingHorizontal: 26,
          borderRadius: 16,
        }}
      >
        <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
          Nulli tänased sammud
        </Text>
      </Pressable>
    </View>
  );
}