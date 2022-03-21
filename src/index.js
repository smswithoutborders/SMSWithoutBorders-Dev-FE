import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { store } from "./features";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
