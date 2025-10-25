import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";
import { Ionicons } from "@expo/vector-icons";

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
            {item.completed ? (
              <Ionicons name="arrow-undo-outline" size={18} color="#333" />
            ) : (
              <Ionicons name="checkmark-done-outline" size={18} color="#333" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={[styles.filterBtn, { width: undefined, paddingHorizontal: 12, borderColor: "#d00" }]}> 
            <Ionicons name="trash-outline" size={18} color="#d00" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

