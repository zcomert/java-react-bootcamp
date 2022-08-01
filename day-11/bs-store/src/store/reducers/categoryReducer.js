import { categories } from "../initialValues/categoryItems";
import { DELETE_ONE_CATEOGRY, GET_ALL_CATEGORIES, POST_ONE_CATEGORY } from "../actions/categoryActions";

const initialValue = {
  categories,
};

function categoryReducer(state = initialValue, { type, payload }) {
  switch (type) {
    case GET_ALL_CATEGORIES:
      return {
        ...state,
        categories : payload
      };
    case DELETE_ONE_CATEOGRY:
      return {
        ...state,
        categories : state.categories.filter(category => category.id!==payload)
      }
    case POST_ONE_CATEGORY:
      return{
        ...state,
        categories : [...state.categories, payload]
      }
    default:
      return {
        ...state,
      };
  }
}
export default categoryReducer;
