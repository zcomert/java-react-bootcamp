import AuthService from "../../services/AuthService";

export const LOGIN = "LOGIN";

const authService = new AuthService();

export function login(login) {
  return function (dispatch) {
    authService
      .login(login)
      .then((resp) => resp.data)
      .then((resp) => dispatch({ type: LOGIN, payload: resp }));
  };
}
