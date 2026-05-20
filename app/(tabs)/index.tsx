import { useEffect, useRef, useState } from "react";
import { View, Text, NativeModules, Pressable } from "react-native";

const { StepModule } = NativeModules;

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

export default function TabHomeScreen() {
  const [steps, setSteps] = useState<number | string>("loading...");
  const [todayKey, setTodayKey] = useState(getTodayKey());

  const lastDateRef = useRef(getTodayKey());

  const loadSteps = () => {
    const currentDate = getTodayKey();

    if (currentDate !== lastDateRef.current) {
      lastDateRef.current = currentDate;
      setTodayKey(currentDate);
    }

    StepModule.getStepCount()
      .then((value: number) => setSteps(value))
      .catch((error: unknown) => setSteps(String(error)));
  };

  const resetSteps = () => {
    StepModule.resetTodaySteps()
      .then(() => loadSteps())
      .catch((error: unknown) => setSteps(String(error)));
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        gap: 20,
      }}
    >
      <Text style={{ fontSize: 20, color: "#555" }}>{todayKey}</Text>

      <Text style={{ fontSize: 32, color: "black" }}>Tänased sammud</Text>

      <Text style={{ fontSize: 56, color: "black", fontWeight: "bold" }}>
        {steps}
      </Text>

      <Pressable
        onPress={resetSteps}
        style={{
          backgroundColor: "black",
          paddingVertical: 14,
          paddingHorizontal: 24,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Nulli tänased sammud
        </Text>
      </Pressable>
    </View>
  );
}