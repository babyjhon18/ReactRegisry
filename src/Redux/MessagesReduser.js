import {SET_MESSAGE_STATE} from '../Constants';

const messageState = {
    sendNotification: false,
    isAccepted: false,
    isReady: true,
    contract: {}
}

export function messagesReduser(state = messageState, action){
    switch(action.type){
        case SET_MESSAGE_STATE:
            state.sendNotification = action.payload.sendNotification;
            state.isAccepted = action.payload.accepted;
            state.isReady = action.payload.ready;
            state.contract = action.payload.contract;
            return { 
                ...state
            }
        default:
            return state
    }
}