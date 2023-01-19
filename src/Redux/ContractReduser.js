import { VIEW_CTC, EDIT_CTC, DELETE_CTC, SEARCH_CTC, UPDATE_CTC_VIEW, SORT_CTC, jsonHeaderRegistry } from '../Constants';
import axios from 'axios';

var contractsData = []
var contracts = []

function getContracts(link){
    axios.get(link).then((response) => {
        contractsData = response.data;
        contracts = contractsData.contracts;
    });
    return contractsData;
}

const contractState = {
    active: 0,
    link: 'http://37.17.58.180:8087/api/Contracts',
    header: jsonHeaderRegistry,
    contracts: getContracts('http://37.17.58.180:8087/api/Contracts'),
    searchedContracts: contracts,
} 

export function contractReduser(state = contractState, action){
    switch(action.type){
        case VIEW_CTC:
            return state;
        case UPDATE_CTC_VIEW:
            return {
                ...state,
                header: action.rowHeader,
                link: action.link,
                contracts: action.payload,
                searchedContracts:  action.payload.contracts
            };            
        case EDIT_CTC:
            return state;
        case DELETE_CTC:
            return state;
        case SORT_CTC:
            var sortedItems = state.contracts.contracts.sort(
                function(a, b){
                    if(a.contract.contractDate > b.contract.contractDate){
                        return action.sortDirection ? 1 : -1;
                    }
                    if(a.contract.contractDate < b.contract.contractDate){
                        return action.sortDirection ? -1 : 1;
                    }
                    return 0;
                }
            );
            return {
                ...state,
                searchedContracts: sortedItems,
            }
        case SEARCH_CTC:
            switch(action.index){ 
                case 0:
                    var searchedItems = state.contracts.contracts.filter((element) => {
                        let finalRes = element.contract.description.toLowerCase();
                        return finalRes.indexOf(action.keyword.toLowerCase()) !== -1
                    });
                    break;
                case 1: 
                    var finalResult = state.contracts.clients.filter(client => {
                        let finalRes = client.name.toLowerCase(); 
                        return finalRes.indexOf(action.keyword.toLowerCase()) !== -1;
                    });
                    var searchedItems = state.contracts.contracts.filter((element) => {
                        return finalResult.some((f) => {
                            return f.id == element.contract.clientId;
                        });
                    });
                    break;
                case 2:
                    var searchedItems = state.contracts.contracts.filter((element) => {
                        let finalRes = element.contract.contractNumber.toLowerCase();
                        return finalRes.indexOf(action.keyword.toLowerCase()) !== -1
                    });
                    break;
            }
            console.log(searchedItems);
            return {
                ...state,
                searchedContracts: searchedItems,
            }
        default: 
            return state;
    }
}