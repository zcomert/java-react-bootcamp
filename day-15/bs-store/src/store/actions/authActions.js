import AuthService from "../../services/AuthService";

export const LOGIN = "LOGIN";

const authService = new AuthService();

export function logIn(body) {
  return function (dispatch) {
    authService
      .login(body)
      .then((resp) => resp)
      .then((resp) => dispatch({ type: LOGIN, payload: resp }));
  };
}
