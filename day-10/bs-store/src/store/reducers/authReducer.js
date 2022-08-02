import { LOGIN } from "../actions/authAction";
import {user} from "../initialValues/authItems";
const initialValues = {
    user
}

function authReducer(state=initialValues, {type,payload}){
    switch (type) {
        case LOGIN:
            return{
                ...state,
                user : {
                    userId : payload.userId,
                    userName:payload.userName,
                    firstName:payload.firstName,
                    lastName:payload.lastName,
                    accessToken:payload.accessToken,
                    refreshToken:payload.refreshToken
                }
            }
        default:
            return{
                ...state
            };
    }
}
export default authReducer;