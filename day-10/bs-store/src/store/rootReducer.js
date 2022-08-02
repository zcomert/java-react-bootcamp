import { combineReducers } from "redux";
import settingReducer from "./reducers/settingReducer";
import categoryReducer from "./reducers/categoryReducer";
import bookReducer from "./reducers/bookReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
  setting: settingReducer,
  category: categoryReducer,
  book: bookReducer,
  auth: authReducer
});

export default rootReducer;
