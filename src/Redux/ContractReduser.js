import { 
    VIEW_CTC, 
    ADD_ACT,
    EDIT_CTC, 
    DELETE_CTC, 
    SEARCH_CTC, 
    UPDATE_CTC_VIEW, 
    SORT_CTC, 
    jsonHeaderRegistry, 
    DELETE_ACT ,
    ADD_PAYM,
    DELETE_PAYM,
    EDIT_ACT,
    EDIT_PAYM,
    SORT_BY_DATE
} from '../Constants';
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
    currentTab: 0,
} 

export function contractReduser(state = contractState, action){
    switch(action.type){
        case ADD_PAYM:
            var selectedContract = state.contracts.contracts.findIndex((contract) => 
            contract.contract.id == action.payload.fK_ContractId);
            const updatedContractsWithPayment = [...state.contracts.contracts];
            updatedContractsWithPayment[selectedContract].payments.push(action.payload);
            return {
                ...state
            }  
        case DELETE_PAYM:
            var indexOfContract = state.contracts.contracts.findIndex((contract) => 
                contract.contract.id == action.payload.payment.fK_ContractId );
            var editedPayments = state.contracts.contracts[indexOfContract].
                payments.filter((payment) =>  {
                return payment.id !== action.payload.payment.id
            });
            var newPaymentsInContract = [...state.contracts.contracts];
            newPaymentsInContract[indexOfContract].payments = editedPayments;
            return {
                ...state
            }
        case EDIT_ACT:
            var indexOfContract = state.contracts.contracts.findIndex((contract) => 
                contract.contract.id == action.payload.fK_ContractId);
            var updatedActIndex = state.contracts.contracts[indexOfContract].acts.findIndex((act) => 
                act.id == action.payload.id);
            state.contracts.contracts[indexOfContract].acts[updatedActIndex].id = action.payload.id; 
            state.contracts.contracts[indexOfContract].acts[updatedActIndex].actNumber = action.payload.actNumber;
            state.contracts.contracts[indexOfContract].acts[updatedActIndex].actDate = action.payload.actDate;
            state.contracts.contracts[indexOfContract].acts[updatedActIndex].fK_ContractId = action.payload.fK_ContractId;
            return{
                ...state
            }
        case EDIT_PAYM:
            var indexOfContract = state.contracts.contracts.findIndex((contract) => 
                contract.contract.id == action.payload.fK_ContractId);
            var updatedPaymentIndex = state.contracts.contracts[indexOfContract].payments.findIndex((payment) => 
                payment.id == action.payload.id);
            state.contracts.contracts[indexOfContract].payments[updatedPaymentIndex].id = action.payload.id; 
            state.contracts.contracts[indexOfContract].payments[updatedPaymentIndex].paymentNumber = action.payload.paymentNumber;
            state.contracts.contracts[indexOfContract].payments[updatedPaymentIndex].paymentDate = action.payload.paymentDate;
            state.contracts.contracts[indexOfContract].payments[updatedPaymentIndex].paymentSum = action.payload.paymentSum;
            state.contracts.contracts[indexOfContract].payments[updatedPaymentIndex].fK_ContractId = action.payload.fK_ContractId;
            return {
                ...state
            }       
        case VIEW_CTC:
            return state;
        case UPDATE_CTC_VIEW:
            return {
                ...state,
                header: action.rowHeader,
                link: action.link,
                contracts: action.payload,
                searchedContracts:  action.payload.contracts,
                currentTab: action.tab
            };
        case DELETE_ACT:
            var indexOfContract = state.contracts.contracts.findIndex((contract) => 
                contract.contract.id == action.payload.act.fK_ContractId);
            var editedActs = state.contracts.contracts[indexOfContract].
                acts.filter((act) =>  {
                return act.id !== action.payload.act.id
            });
            var newActsInContract = [...state.contracts.contracts];
            newActsInContract[indexOfContract].acts = editedActs;
            return {
                ...state
            }
        case ADD_ACT:
            var selectedContract = state.contracts.contracts.findIndex((contract) => 
                contract.contract.id == action.payload.fK_ContractId);
            const updatedContracts = [...state.contracts.contracts];
            updatedContracts[selectedContract].acts.push(action.payload);
            return {
                ...state
            }  
        case EDIT_CTC:
            console.log(action.payload);
            var selectedContract = state.contracts.contracts.findIndex((contract) => 
                contract.contract.id == action.payload.id);
            const updateContracts = [...state.contracts.contracts];
            updateContracts[selectedContract] = action.payload;
            return {
                ...state
            }
        case DELETE_CTC:
            return state;
        case SORT_CTC:
            var sortedItems = [];
            switch(action.sortType){
                case 0: 
                    sortedItems = state.contracts.contracts.sort(function(a, b){
                        if(action.sortDirection){
                            return (a.contract.readyMark === b.contract.readyMark) ? 0 : a.contract.readyMark ? 1 : -1;
                        }
                        else{
                            return (a.contract.readyMark === b.contract.readyMark) ? 0 : a.contract.readyMark ? -1 : 1
                        }
                    });
                    break;
                case 1: 
                    sortedItems = state.contracts.contracts.sort(function(a, b){
                        if(action.sortDirection){
                            return (a.contract.signatureMark === b.contract.signatureMark) ? 0 : a.contract.signatureMark ? 1 : -1;
                        }
                        else{
                            return (a.contract.signatureMark === b.contract.signatureMark) ? 0 : a.contract.signatureMark ? -1 : 1
                        }
                    });
                    break;
                case 2: 
                    sortedItems = state.contracts.contracts.sort(function(a, b){
                        if(action.sortDirection){
                            return (a.contract.ourDelivery === b.contract.ourDelivery) ? 0 : a.contract.ourDelivery ? 1 : -1;
                        }
                        else{
                            return (a.contract.ourDelivery === b.contract.ourDelivery) ? 0 : a.contract.ourDelivery ? -1 : 1
                        }
                    });
                    break;
                case 3: 
                    sortedItems = state.contracts.contracts.sort(function(a, b){
                        if(a.contract.contractDate > b.contract.contractDate){
                            return action.sortDirection ? 1 : -1;
                        }
                        if(a.contract.contractDate < b.contract.contractDate){
                            return action.sortDirection ? -1 : 1;
                        }
                        return 0;
                    });
                    break;
                case 4:
                    sortedItems = state.contracts.contracts.sort(function (a, b) {
                        if (a.contract.description < b.contract.description) {
                            return action.sortDirection ? 1 : -1;
                        }
                        if (a.contract.description > b.contract.description) {
                            return action.sortDirection ? -1 : 1;
                        }
                        return 0;
                    });
                    break;
            }
            return {
                ...state,
                searchedContracts: sortedItems,
            }
        case SORT_BY_DATE:
            var sortedItems = [];
            let dateFrom = new Date(action.dateFrom);
            let dateTo = new Date(action.dateTo);
            state.contracts.contracts.map((contract) => {
                let date = new Date(contract.contract.contractDate); 
                if(dateFrom < date && date < dateTo){
                    sortedItems.push(contract);
                }
            })
            return{
                ...state,
                searchedContracts: sortedItems
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