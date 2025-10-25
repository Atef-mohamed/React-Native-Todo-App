import React, { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "../styles";
import TodoListItem from "../components/TodoListItem";
import { useDispatch, useSelector } from "react-redux";
import { toggleTodo as toggleTodoAction, deleteTodo as deleteTodoAction } from "../app/features/todos/todosSlice";

export default function CompletedScreen({ navigation }) {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
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
              onToggle={() => dispatch(toggleTodoAction(item.id))}
              onDelete={() => dispatch(deleteTodoAction(item.id))}
            />
          )}
          ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 24 }}>No completed todos.</Text>}
        />
      </View>
    </View>
  );
}

