import React, { useEffect, useState } from "react";
import { View, Text, NativeModules } from "react-native";

const { StepModule } = NativeModules;

export default function HomeScreen() {
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const value = await StepModule.getTodaySteps();
        setSteps(value);
      } catch (e) {
        console.log("Native error:", e);
      }
    };

    load();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 40 }}>
        Sammud: {steps}
      </Text>
    </View>
  );
}