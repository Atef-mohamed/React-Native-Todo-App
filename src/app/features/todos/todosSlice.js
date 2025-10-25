import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setAll: (_state, action) => {
      const arr = Array.isArray(action.payload) ? action.payload : [];
      return arr;
    },
    addTodo: (state, action) => {
      const { title, description } = action.payload || {};
      const t = (title || "").trim();
      if (!t) return;
      state.unshift({
        id: Date.now().toString(),
        title: t,
        description: (description || "").trim(),
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const id = action.payload;
      const idx = state.findIndex((t) => t.id === id);
      if (idx !== -1) state[idx].completed = !state[idx].completed;
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      return state.filter((t) => t.id !== id);
    },
  },
});

export const { setAll, addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
