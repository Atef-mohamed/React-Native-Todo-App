import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";
import store from "./src/app/store";
import { hydrateTodos, persistTodos } from "./src/app/asyncStorage";
import { Provider } from "react-redux";
import React, { useEffect } from "react";

export default function App() {
  useEffect(() => {
    hydrateTodos();
    persistTodos();
  }, []);
  return (
    <Provider store={store}>

    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
    </Provider>
  );
}
