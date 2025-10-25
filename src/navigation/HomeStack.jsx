import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import TodoDetailsScreen from "../screens/TodoDetailsScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack({ todos, addTodo, toggleTodo, deleteTodo }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: Platform.OS === "ios" }}>
      <Stack.Screen name="Todos">
        {(props) => (
          <HomeScreen
            {...props}
            todos={todos}
            addTodo={addTodo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="TodoDetails" options={{ title: "Details" }}>
        {(props) => (
          <TodoDetailsScreen
            {...props}
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
