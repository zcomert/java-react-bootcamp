import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AppContext, { AppContextProvider } from "./context/AppContext";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import CustomThemeProvider from "./components/theme/CustomThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore();
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <AppContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppContextProvider>
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
