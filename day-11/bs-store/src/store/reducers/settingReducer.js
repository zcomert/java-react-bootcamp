import { GET_THEME, SET_MESSAGE, SET_THEME } from "../actions/settingActions";
import {pageSize, theme, message} from '../initialValues/settingItems'

const initialValue ={
    theme,
    pageSize,
    message
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
                message : payload
            }
        }
        default:
            return{
                ...state
            };
    }
}