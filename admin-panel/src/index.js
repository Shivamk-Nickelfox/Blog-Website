import React from "react";
import ReactDOM from "react-dom/client";
import "./GlobalCSS/index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import store from "./redux/store";
import { CssBaseline } from "@mui/material";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
