import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { store } from "./features";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
