import { GET_THEME, SET_THEME } from "../actions/settingActions";
import {pageSize, theme} from '../initialValues/settingItems'

const initialValue ={
    theme,
    pageSize
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
        default:
            return{
                ...state
            };
    }
}