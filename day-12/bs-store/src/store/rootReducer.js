import { combineReducers } from "redux";
import settingReducer from "./reducers/settingReducer";
import categoryReducer from "./reducers/categoryReducer";
import bookReducer from "./reducers/bookReducer";

const rootReducer = combineReducers({
    setting: settingReducer,
    category : categoryReducer,
    book : bookReducer
});

export default rootReducer;