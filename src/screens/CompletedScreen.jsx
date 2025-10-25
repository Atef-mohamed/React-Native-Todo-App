import React, { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../styles";
import TodoListItem from "../components/TodoListItem";

export default function CompletedScreen({ navigation, todos, toggleTodo, deleteTodo }) {
  const completed = useMemo(() => todos.filter((t) => t.completed), [todos]);

  return (
    <View style={[styles.container, { justifyContent: "flex-start", paddingTop: 24 }]}> 
      {/* <Text style={{ fontSize: 24, fontWeight: "bold", textTransform: "uppercase", marginTop: 8 }}>COMPLETED</Text> */}
      <View style={[styles.todosContainer, { marginTop: 16 }]}> 
        <FlatList
          data={completed}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TodoListItem
              item={item}
              onPress={() => navigation.navigate("TodoDetails", { id: item.id })}
              onToggle={() => toggleTodo(item.id)}
              onDelete={() => deleteTodo(item.id)}
            />
          )}
          ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 24 }}>No completed todos.</Text>}
        />
      </View>
    </View>
  );
}
