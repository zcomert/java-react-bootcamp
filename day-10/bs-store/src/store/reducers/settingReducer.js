import { GET_THEME, SET_THEME } from "../actions/settingActions";
import { theme } from "../initialValues/settingItems";

const initialValues = {
  theme
};

export default function settingReducer(state = initialValues, { type, payload }) {
  switch (type) {
    case SET_THEME: {
      return {
        ...state,
        theme:payload
      };
    }
    case GET_THEME: {
        return{
        ...state
        }
    }
    default:
      return {
        ...state
      };
  }
}
