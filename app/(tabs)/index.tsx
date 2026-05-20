import { useEffect, useState } from "react";
import { View, Text, NativeModules, Pressable } from "react-native";

const { StepModule } = NativeModules;

export default function TabHomeScreen() {
  const [steps, setSteps] = useState<number | string>("loading...");

  const loadSteps = () => {
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
        gap: 24,
      }}
    >
      <Text style={{ fontSize: 32, color: "black" }}>Sammud</Text>

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