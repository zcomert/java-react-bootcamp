import { CLOSE_SNACKBAR, GET_THEME, SET_MESSAGE, SET_THEME } from "../actions/settingActions";
import {pageSize, theme, message, showSnackbar} from '../initialValues/settingItems'

const initialValue ={
    theme,
    pageSize,
    message,
    showSnackbar
}

export default function settingReducer(state=initialValue,{type,payload}){
    switch (type) {
        case GET_THEME:
            return{
                ...state
            }
        case SET_THEME:
            return{
                ...state,
                theme:payload
            }
        case SET_MESSAGE:{
            return{
                ...state,
                message : payload,
                showSnackbar : true
            }
        }
        case CLOSE_SNACKBAR:{
            return {
                ...state,
                showSnackbar:false,
                message:''
            }
        }
        default:
            return{
                ...state
            };
    }
}