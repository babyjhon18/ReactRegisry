import { VIEW_CTC, EDIT_CTC, DELETE_CTC, SEARCH_CTC, UPDATE_CTC_VIEW } from '../Constants'

export async function contractReduser(state, action){
    switch(action.type){
        case VIEW_CTC:
            return state;
        case UPDATE_CTC_VIEW:
            state.contracts = action.payload;
            return state;
        case EDIT_CTC:
            const contract = state.contracts.findIndex(ctc => ctc.id === action.payload);
            return state;
        case DELETE_CTC:
            const filteredCounters = state.filter(ctc => ctc.id === action.payload);
            return {...state, filteredCounters};
        case SEARCH_CTC:
            return state;
        default: 
            return state;
    }
}
