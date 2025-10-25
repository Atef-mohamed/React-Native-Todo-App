import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CompletedScreen from "../screens/CompletedScreen";
import TodoDetailsScreen from "../screens/TodoDetailsScreen";

const Stack = createNativeStackNavigator();

export default function CompletedStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: Platform.OS === "ios" }}>
      <Stack.Screen name="CompletedTodos" options={{ title: "Completed" }} component={CompletedScreen} />
      <Stack.Screen name="TodoDetails" options={{ title: "Details" }} component={TodoDetailsScreen} />
    </Stack.Navigator>
  );
}

