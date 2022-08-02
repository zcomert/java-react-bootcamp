import AuthorService from "../../services/AuthorService";

export const GET_ALL_AUTHORS = "GET_ALL_AUTHORS";
export const POST_ONE_AUTHOR = "POST_ONE_AUTHOR";
export const DELETE_ONE_AUTHOR = "DELETE_ONE_AUTHOR";
export const GET_ONE_AUTHOR = "GET_ONE_AUTHOR";
export const PUT_ONE_AUTHOR = "PUT_ONE_AUTHOR";

const authorService = new AuthorService();

export function getAllAuthors() {
  return function (dispatch) {
    authorService
      .getAllAuthors()
      .then((resp) => resp.data)
      .then((resp) => dispatch({ type: GET_ALL_AUTHORS, payload: resp }));
  };
}

export function getOneAuthor(id) {
  return function (dispatch) {
    authorService
      .getOneAuthor(id)
      .then((resp) => resp.data)
      .then((resp) => dispatch({ type: GET_ONE_AUTHOR, payload: resp }));
  };
}

export function postOneAuthor(author) {
  return function (dispatch) {
    authorService
      .postOneAuthor(author)
      .then((resp) => resp.data)
      .then((resp) => dispatch({ type: POST_ONE_AUTHOR, payload: resp }));
  };
}

export function putOneAuthor(id, author) {
  return function (dispatch) {
    authorService
      .putOneAuthor(id, author)
      .then((resp) => resp.data)
      .then((resp) => dispatch({ type: PUT_ONE_AUTHOR, payload: resp }));
  };
}

export function deleteOneAuthor(id) {
  return function (dispatch) {
    authorService
      .deleteOneAuthor(id)
      .then((resp) => resp.data)
      .then((resp) => dispatch({ type: DELETE_ONE_AUTHOR, payload: id }));
  };
}
