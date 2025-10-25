import React, { useMemo, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { styles } from "../styles";
import TodoListItem from "../components/TodoListItem";
import { useDispatch, useSelector } from "react-redux";
import { addTodo as addTodoAction, toggleTodo as toggleTodoAction, deleteTodo as deleteTodoAction } from "../app/features/todos/todosSlice";

export default function HomeScreen({ navigation }) {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all"); // all | active

  const filtered = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    return todos;
  }, [todos, filter]);

  const handleSubmit = () => {
    dispatch(addTodoAction({ title, description }));
    setTitle("");
    setDescription("");
  };

  return (
    <View style={[styles.container, { justifyContent: "flex-start", paddingTop: 24 }]}> 
      {/* <Text style={{ fontSize: 24, fontWeight: "bold", textTransform: "uppercase", marginTop: 8 }}>TODO APP</Text> */}
      <TextInput style={styles.input} placeholder="Todo Title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Todo Description" multiline value={description} onChangeText={setDescription} />
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>

      <View style={styles.dividerLine} />
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterBtn, filter === "all" && styles.activeFilterBtn]} onPress={() => setFilter("all")}>
          <Text style={[styles.filterText, filter === "all" && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterBtn, filter === "active" && styles.activeFilterBtn]} onPress={() => setFilter("active")}>
          <Text style={[styles.filterText, filter === "active" && styles.activeFilterText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn]}
          onPress={() => navigation.getParent()?.navigate("CompletedTab")}
        >
          <Text style={[styles.filterText]}>Completed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.todosContainer}>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoListItem
              item={item}
              onPress={() => navigation.navigate("TodoDetails", { id: item.id })}
              onToggle={() => dispatch(toggleTodoAction(item.id))}
              onDelete={() => dispatch(deleteTodoAction(item.id))}
            />
          )}
          ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 24 }}>No todos yet.</Text>}
        />
      </View>
    </View>
  );
}

