import { SET_MESSAGE_STATE } from "../Constants"

export function SetMessageState(data){
    return{
        type: SET_MESSAGE_STATE,
        payload: data
    }
}