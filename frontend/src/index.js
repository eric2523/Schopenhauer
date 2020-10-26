import React from "react";
import ReactDOM from "react-dom";
import { Root } from "./components/root";
import { configureStore } from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
  // currently no preloaded state
  let store = configureStore();
  const root = document.getElementById("root");
  ReactDOM.render(<Root store={store} />, root);
});
