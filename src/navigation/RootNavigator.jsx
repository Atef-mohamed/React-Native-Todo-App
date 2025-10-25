import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "./HomeStack";
import CompletedStack from "./CompletedStack";

const Tab = createBottomTabNavigator();

// Stacks are now standalone components in this folder.

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let icon = "home-outline";
              if (route.name === "HomeTab") icon = "home-outline";
              if (route.name === "CompletedTab") icon = "checkmark-done-outline";
              return <Ionicons name={icon} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="HomeTab" options={{ title: "Home" }} component={HomeStack} />
          <Tab.Screen name="CompletedTab" options={{ title: "Completed" }} component={CompletedStack} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

