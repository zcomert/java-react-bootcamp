import { categories, category } from "../initialValues/categoryItems";
import {
  DELETE_ONE_CATEOGRY,
  GET_ALL_CATEGORIES,
  GET_ONE_CATEGORY,
  POST_ONE_CATEGORY,
  PUT_ONE_CATEGORY,
} from "../actions/categoryActions";

const initialValue = {
  categories,
  category,
};

function categoryReducer(state = initialValue, { type, payload }) {
  switch (type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case DELETE_ONE_CATEOGRY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== payload
        ),
      };
    case POST_ONE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
      };
    case GET_ONE_CATEGORY:
      return {
        ...state,
        category: payload,
      };
    case PUT_ONE_CATEGORY:
      return {
        ...state,
        categories: [
          ...state.categories.filter((category) => category.id !== payload.id),
          payload,
        ],
      };

    default:
      return {
        ...state,
      };
  }
}
export default categoryReducer;
