import { combineReducers } from "redux";
import authorReducer from "./reducers/authorReducer"
import settingReducer from "./reducers/settingReducer";

const rootReducer = combineReducers({
    author : authorReducer,
    setting: settingReducer
});

export default rootReducer;