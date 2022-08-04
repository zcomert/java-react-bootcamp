import {
  CLOSE_SNACKBAR,
  GET_THEME,
  SET_SNACKBAR,
  SET_THEME,
} from "../actions/settingActions";
import { pageSize, theme, snackbar } from "../initialValues/settingItems";

const initialValue = {
  theme,
  pageSize,
  snackbar,
};

export default function settingReducer(
  state = initialValue,
  { type, payload }
) {
  switch (type) {
    case GET_THEME:
      return {
        ...state,
      };
    case SET_THEME:
      return {
        ...state,
        theme: payload,
      };
    case SET_SNACKBAR: {
      return {
        ...state,
        snackbar: {
          message: payload.message,
          duration: payload.duration,
          severity: payload.severity,
          open: true // payload.open,
        },
      };
    }
    case CLOSE_SNACKBAR: {
      return {
        ...state,
        snackbar:{
            message:'',
            open:false
        }
      };
    }
    default:
      return {
        ...state,
      };
  }
}
