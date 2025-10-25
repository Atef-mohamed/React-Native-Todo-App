import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "./store";
import { setAll } from "./features/todos/todosSlice";

const STORAGE_KEY = "@todos";

export async function hydrateTodos() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        store.dispatch(setAll(parsed));
      }
    }
  } catch {}
}

let subscribed = false;
export function persistTodos() {
  if (subscribed) return;
  subscribed = true;
  let last = store.getState().todos;
  store.subscribe(() => {
    const current = store.getState().todos;
    if (current !== last) {
      last = current;
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(current)).catch(() => {});
    }
  });
}
