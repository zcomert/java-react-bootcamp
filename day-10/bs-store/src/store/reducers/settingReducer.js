import { CLOSE_SNACKBAR, GET_THEME, OPEN_DIALOG, SET_MESSAGE, SET_THEME } from "../actions/settingActions";
import {pageSize, theme, message, showSnackbar, showDiaglog} from '../initialValues/settingItems'

const initialValue ={
    theme,
    pageSize,
    message,
    showSnackbar,
    showDiaglog
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
        case OPEN_DIALOG:
            return{
                ...state,
                showDiaglog : payload
            }
        default:
            return{
                ...state
            };
    }
}