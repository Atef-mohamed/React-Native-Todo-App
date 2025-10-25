import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

export default function TodoDetailsScreen({ route, navigation, todos, toggleTodo, deleteTodo }) {
  const { id } = route.params || {};

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
      <Text style={[styles.todoTitle, { fontSize: 24 }]}>{todo.title}</Text>
      {todo.description ? (
        <Text style={[styles.todoDescription, { marginTop: 8 }]}>{todo.description}</Text>
      ) : null}

      <View style={{ height: 1, backgroundColor: "#ddd", alignSelf: "stretch", marginVertical: 16 }} />

      <TouchableOpacity style={[styles.filterBtn, { alignSelf: "stretch", height: 48, marginBottom: 12 }]} onPress={() => toggleTodo(todo.id)}>
        <Text style={styles.filterText}>{todo.completed ? "Mark as Active" : "Mark as Completed"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.filterBtn, { alignSelf: "stretch", height: 48, borderColor: "#d00" }]}
        onPress={() => {
          deleteTodo(todo.id);
          navigation.goBack();
        }}
      >
        <Text style={[styles.filterText, { color: "#d00" }]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
