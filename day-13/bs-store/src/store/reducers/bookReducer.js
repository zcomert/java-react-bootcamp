import {
  DELETE_ONE_BOOK,
  GET_ALL_BOOKS,
  GET_ONE_BOOK,
  POST_ONE_BOOK,
  PUT_ONE_BOOK,
} from "../actions/bookActions";
import { books } from "../initialValues/bookItems";

const initialState = {
  books,
};

function bookReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_BOOKS: {
      return {
        ...state,
        books: payload,
      };
    }
    case GET_ONE_BOOK:
      return {
        ...state,
        book: state.books.filter((book) => {
          return book.id === payload;
        }),
      };
    case POST_ONE_BOOK:
      return {
        ...state,
        books: [...state.books, payload],
      };
    case DELETE_ONE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== payload),
      };
    case PUT_ONE_BOOK:
      return {
        ...state,
        books : [...state.book.filter(book => book.id!==payload.id), payload]
      };
    default:
      return { ...state };
  }
}

export default bookReducer;
