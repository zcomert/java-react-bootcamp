import BookService from "../../services/BookService";
export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const DELETE_ONE_BOOK = "DELETE_ONE_BOOK";
export const POST_ONE_BOOK = "POST_ONE_BOOK";

const bookService = new BookService();

export function getAllBooks() {
  return function (dispatch) {
    bookService
      .getAllBooks()
      .then((resp) => resp.data)
      .then((resp) => dispatch({ type: GET_ALL_BOOKS, payload: resp }));
  };
}

export function deleteOneBook(id) {
  return function (dispatch) {
    bookService
      .deleteOneBook(id)
      .then(() => dispatch({ type: DELETE_ONE_BOOK, payload: id }));
  };
}

export function postOneBook(book) {
  return function (dispatch) {
    bookService
      .postOneBook(book)
      .then((resp) => resp.data)
      .then((resp) => dispatch({ type: POST_ONE_BOOK, payload: resp }));
  };
}
