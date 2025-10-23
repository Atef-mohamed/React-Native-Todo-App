import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { useState } from "react";

const Home = () => {
  const [data, setData] = useState([
    {
      id: 1,
      title: "Create project",
      description: "create react native to-do-app",
    },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      description,
    };
    setData([newTodo, ...data]);

    setTitle("");
    setDescription("");
  };
  return (
    <View style={styles.container}>
      <Text
        style={{ fontSize: 24, fontWeight: "bold", textTransform: "uppercase" }}
      >
        TODO APP
      </Text>
      {/* // create 2 Inputs for todo title and description */}
      <TextInput
        style={styles.input}
        placeholder="Todo Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Todo Description"
        multiline={true}
        value={description}
        onChangeText={setDescription}
      />
      {/* // Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
      {/*  filter buttons*/}
      <View style={styles.dividerLine} />
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterBtn, styles.activeFilterBtn]}>
          <Text style={[styles.filterText, styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Completed</Text>
        </TouchableOpacity>
      </View>
      {/* create flat list to dispaly data */}
      <View style={styles.todosContainer}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoTitle}>{item.title}</Text>
              <Text style={styles.todoDescription}>{item.description}</Text>
            </View>
          )}
        ></FlatList>
      </View>
    </View>
  );
};

export default Home;
