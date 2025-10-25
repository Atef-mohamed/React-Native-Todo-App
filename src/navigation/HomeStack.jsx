import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TodoDetailsScreen from "../screens/TodoDetailsScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: Platform.OS === "ios" }}>
      <Stack.Screen name="Todos" component={HomeScreen} />
      <Stack.Screen name="TodoDetails" options={{ title: "Details" }} component={TodoDetailsScreen} />
    </Stack.Navigator>
  );
}

