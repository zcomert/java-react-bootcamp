export const SET_THEME = "SET_THEME";
export const GET_THEME = "GET_THEME";
export const SET_MESSAGE = "SET_MESSAGE";

export function setTheme(theme) {
  return function (dispatch) {
    dispatch({ type: SET_THEME, payload: theme });
  };
}

export function getTheme() {
  return function (dispatch) {
    dispatch({ type: GET_THEME });
  };
}

export function setMessage(msg) {
  return function (dispatch) {
    dispatch({ type: SET_MESSAGE, payload: msg });
  };
}
