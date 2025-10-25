import React from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CompletedScreen from "../screens/CompletedScreen";
import TodoDetailsScreen from "../screens/TodoDetailsScreen";

const Stack = createNativeStackNavigator();

export default function CompletedStack({ todos, toggleTodo, deleteTodo }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: Platform.OS === "ios" }}>
      <Stack.Screen name="CompletedTodos" options={{ title: "Completed" }}>
        {(props) => (
          <CompletedScreen
            {...props}
            todos={todos}
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
