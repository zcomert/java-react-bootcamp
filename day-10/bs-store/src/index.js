import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./context/AppContext";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import CustomThemeProvider from "./components/themes/CustomTeamProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <AppContextProvider>
        <BrowserRouter>
          <CustomThemeProvider>
            <App />
          </CustomThemeProvider>
        </BrowserRouter>
      </AppContextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
