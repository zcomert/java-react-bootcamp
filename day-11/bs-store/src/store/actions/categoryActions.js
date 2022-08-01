import CategoryService from "../../services/CategoryService";

export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";

const categoryService = new CategoryService();

export function getAllCategories(){
    return function(dispatch){
        categoryService.getAllCategories()
        .then(resp => resp.data)
        .then(resp => dispatch({type:GET_ALL_CATEGORIES, payload : resp}))
    }
}