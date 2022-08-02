import { combineReducers } from "redux";
import settingReducer from "./reducers/settingReducer";
import categoryReducer from "./reducers/categoryReducer";

const rootReducer = combineReducers({
    setting: settingReducer,
    category : categoryReducer
});

export default rootReducer;