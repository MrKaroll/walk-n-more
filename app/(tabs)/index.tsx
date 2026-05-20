import { useEffect, useState } from "react";
import { View, Text, NativeModules } from "react-native";

const { StepModule } = NativeModules;

export default function TabHomeScreen() {
  const [steps, setSteps] = useState<number | string>("loading...");

  useEffect(() => {
    const loadSteps = () => {
      StepModule.getStepCount()
        .then((value: number) => setSteps(value))
        .catch((error: unknown) => setSteps(String(error)));
    };

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
      }}
    >
      <Text style={{ fontSize: 32, color: "black" }}>Sammud</Text>
      <Text style={{ fontSize: 48, color: "black" }}>{steps}</Text>
    </View>
  );
}