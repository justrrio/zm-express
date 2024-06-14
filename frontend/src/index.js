import React from "react";
import { createRoot } from "react-dom/client";
// Redux toolkit
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "bulma/css/bulma.css";
import axios from "axios";

// !IMPORTANT
axios.defaults.withCredentials = true; // If you don't set this up, you must to set the credentials per request

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
