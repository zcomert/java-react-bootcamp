import { DELETE_ONE_AUTHOR, GET_ALL_AUTHORS, GET_ONE_AUTHOR, POST_ONE_AUTHOR, PUT_ONE_AUTHOR } from "../actions/authorActions";
import { author, authors } from "../initialValues/authorItems";

const initialState = {
  authors,
  author
};

export default function authorReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_ALL_AUTHORS:
      return {
        ...state,
        authors: payload,
      };
    
    case GET_ONE_AUTHOR:{
      return{
        ...state,
        author : payload
      }
    }

    case POST_ONE_AUTHOR:{
      return{
        ...state,
        authors:[...state.authors, payload]
      };
    }

    case PUT_ONE_AUTHOR:{
      return{
        ...state,
        authors:[...state.authors.filter(author => author.id!==payload.id), payload]
      };
    }

    case DELETE_ONE_AUTHOR:{
      return{
        ...state,
        authors:[...state.authors.filter(author => author.id!==payload)]
      };
    }

    default:
      return {
        ...state
      }
  }
}
