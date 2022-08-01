import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AppContext, {AppContextProvider} from "./context/AppContext";
import  configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore();
root.render(
  <React.StrictMode>
    <Provider store={store} >
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
