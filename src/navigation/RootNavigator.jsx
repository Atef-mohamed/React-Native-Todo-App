import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeStack from "./HomeStack";
import CompletedStack from "./CompletedStack";

const Tab = createBottomTabNavigator();

// Stacks are now standalone components in this folder.

export default function RootNavigator() {
  const STORAGE_KEY = "@todos";
  const [todos, setTodos] = useState([]);

  // hydrate
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) setTodos(parsed);
        } catch {}
      }
    });
  }, []);

  // persist
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos)).catch(() => {});
  }, [todos]);

  const addTodo = (title, description) => {
    if (!title?.trim()) return;
    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description?.trim() || "",
      completed: false,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

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
          <Tab.Screen name="HomeTab" options={{ title: "Home" }}>
            {() => (
              <HomeStack
                todos={todos}
                addTodo={addTodo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="CompletedTab" options={{ title: "Completed" }}>
            {() => (
              <CompletedStack
                todos={todos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
