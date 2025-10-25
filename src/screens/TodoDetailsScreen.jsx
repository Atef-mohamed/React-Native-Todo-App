import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo as toggleTodoAction, deleteTodo as deleteTodoAction } from "../app/features/todos/todosSlice";
import { Ionicons } from "@expo/vector-icons";

export default function TodoDetailsScreen({ route, navigation }) {
  const { id } = route.params || {};
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const todo = useMemo(() => todos.find((t) => t.id === id), [todos, id]);

  if (!todo) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Text>Todo not found.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { alignItems: "flex-start", padding: 16 }]}> 
      <View style={{ alignSelf: "stretch", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text style={[styles.todoTitle, { fontSize: 24, flex: 1, paddingRight: 12 }]} numberOfLines={2}>{todo.title}</Text>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 16,
            backgroundColor: todo.completed ? "#E6F4EA" : "#F3F4F6",
            borderWidth: 1,
            borderColor: todo.completed ? "#22C55E" : "#e5e7eb",
          }}
        >
          <Text style={{ color: todo.completed ? "#16A34A" : "#374151", fontWeight: "600" }}>
            {todo.completed ? "Completed" : "Active"}
          </Text>
        </View>
      </View>
      {todo.description ? (
        <Text style={[styles.todoDescription, { marginTop: 8 }]}>{todo.description}</Text>
      ) : null}

      <View style={{ height: 1, backgroundColor: "#ddd", alignSelf: "stretch", marginVertical: 16 }} />

      <View style={{ alignSelf: "stretch", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <TouchableOpacity
            style={[
              styles.filterBtn,
              {
                paddingVertical: 10,
                paddingHorizontal: 14,
                minWidth: 170,
                borderColor: todo.completed ? "#22C55E" : "#d1d5db",
                backgroundColor: todo.completed ? "#E6F4EA" : "#fff",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              },
            ]}
            onPress={() => dispatch(toggleTodoAction(todo.id))}
          >
            <Ionicons
              name={todo.completed ? "arrow-undo-outline" : "checkmark-done-outline"}
              size={20}
              color={todo.completed ? "#16A34A" : "#111827"}
            />
            <Text style={[styles.filterText, { color: todo.completed ? "#16A34A" : "#111827" }]}>
              {todo.completed ? "Mark as Active" : "Mark as Completed"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterBtn,
              {
                paddingVertical: 10,
                paddingHorizontal: 14,
                minWidth: 170,
                borderColor: "#dc2626",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              },
            ]}
            onPress={() => {
              dispatch(deleteTodoAction(todo.id));
              navigation.goBack();
            }}
          >
            <Ionicons name="trash-outline" size={20} color="#dc2626" />
            <Text style={[styles.filterText, { color: "#dc2626" }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
