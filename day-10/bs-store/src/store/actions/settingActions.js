export const SET_THEME = "SET_THEME";
export const GET_THEME = "GET_THEME";
export const SET_MESSAGE = "SET_MESSAGE";
export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";
export const OPEN_DIALOG = "OPEN_DIALOG";

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

export function closeSnackBar() {
  return function (dispatch) {
    dispatch({ type: CLOSE_SNACKBAR });
  };
}

export function openDialog(key) {
  return function (dispatch) {
    dispatch({ type: OPEN_DIALOG, payload: key });
  };
}
