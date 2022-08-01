import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import CustomThemeProvider from "./components/theme/CustomThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
