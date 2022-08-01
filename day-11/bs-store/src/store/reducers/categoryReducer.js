import { categories } from "../initialValues/categoryItems";
import { GET_ALL_CATEGORIES } from "../actions/categoryActions";

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
    default:
      return {
        ...state,
      };
  }
}
export default categoryReducer;
