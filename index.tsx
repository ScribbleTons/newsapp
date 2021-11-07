import React from "react";
import {registerRootComponent}from "expo";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store";
import App from "./App";

 function Main() {
  return (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );
}

export default registerRootComponent(Main)