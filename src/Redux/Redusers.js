import { VIEW_CTC, EDIT_CTC, DELETE_CTC, SEARCH_CTC, UPDATE_CTC_VIEW, jsonHeaderRegistry } from '../Constants';
import axios from 'axios';

var contractsData = []

function getContracts(link){
    axios.get(link).then((response) => {
        contractsData = response.data;
    });
    return contractsData;
}

const contractState = {
    active: 0,
    link: 'http://37.17.58.180:8087/api/Contracts',
    header: jsonHeaderRegistry,
    contracts: getContracts('http://37.17.58.180:8087/api/Contracts')
} 

export function contractReduser(state = contractState, action){
    switch(action.type){
        case VIEW_CTC:
            return state;
        case UPDATE_CTC_VIEW:
            state.header = action.rowHeader;
            state.link = action.link;
            state.contracts = action.payload;
            return state;            
        case EDIT_CTC:
            return state;
        case DELETE_CTC:
            return state;
        case SEARCH_CTC:
            state.contracts = action.payload;
            return state;
        default: 
            return state;
    }
}
