export const SET_THEME = "SET_THEME";
export const GET_THEME = "GET_THEME";

export function setTheme(theme) {
  return function (dispatch) {
    dispatch({ type: SET_THEME, payload: theme });
  };
}

export function getTheme(){
    return function(dispatch){
        dispatch({type:GET_THEME})
    }
}
