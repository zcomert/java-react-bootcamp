import CategoryService from "../../services/CategoryService";

export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const DELETE_ONE_CATEOGRY = "DELETE_ONE_CATEOGRY";

const categoryService = new CategoryService();

export function getAllCategories(){
    return function(dispatch){
        categoryService.getAllCategories()
        .then(resp => resp.data)
        .then(resp => dispatch({type:GET_ALL_CATEGORIES, payload : resp}))
    }
}

export function deleteOneCategory(id){
    return function(dispatch){
        categoryService.deleteOneCategory(id)
        .then(resp => dispatch({type:DELETE_ONE_CATEOGRY, payload: id}))
    }
}