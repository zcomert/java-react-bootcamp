import { GET_ALL_BOOKS } from "../actions/bookActions";
import { books, lastestBooks } from "../initialValues/bookItems";

const initialState = {
  books,
  lastestBooks,
};

function bookReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_BOOKS: {
      return {
        ...state,
        books: payload,
      };
    }
    default:
      return { ...state };
  }
}

export default bookReducer;
