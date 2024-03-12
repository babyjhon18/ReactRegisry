import {SET_MESSAGE_STATE} from '../Constants';

const messageState = {
    isAccepted: false,
    isReady: true
}

export function messagesReduser(state = messageState, action){
    switch(action.type){
        case SET_MESSAGE_STATE:
            state.isAccepted = action.payload.accepted;
            state.isReady = action.payload.ready
            return { 
                ...state
            }
        default:
            return state
    }
}