import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

export default function TodoListItem({ item, onPress, onToggle, onDelete }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.todoItem}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={[styles.todoTitle, item.completed && styles.doneTodo]}>{item.title}</Text>
          {item.description ? (
            <Text style={[styles.todoDescription, item.completed && styles.doneTodo]} numberOfLines={2}>
              {item.description}
            </Text>
          ) : null}
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity onPress={onToggle} style={[styles.filterBtn, { width: undefined, paddingHorizontal: 12 }]}> 
            <Text style={styles.filterText}>{item.completed ? "Undo" : "Done"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={[styles.filterBtn, { width: undefined, paddingHorizontal: 12, borderColor: "#d00" }]}> 
            <Text style={[styles.filterText, { color: "#d00" }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
