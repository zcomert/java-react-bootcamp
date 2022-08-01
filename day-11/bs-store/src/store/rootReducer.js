import { combineReducers } from "redux";
import settingReducer from "./reducers/settingReducer";

const rootReducer = combineReducers({
    setting: settingReducer
});

export default rootReducer;