import { combineReducers } from "redux";
import settingReducer from "./reducers/settingReducer";
import categoryReducer from "./reducers/categoryReducer";
import bookReducer from "./reducers/bookReducer";
import authorReducer from "./reducers/authorReducer";
import authReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
    setting: settingReducer,
    category : categoryReducer,
    book : bookReducer,
    author : authorReducer,
    auth : authReducer
});

export default rootReducer;