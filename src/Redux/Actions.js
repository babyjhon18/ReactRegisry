import { VIEW_CTC, UPDATE_CTC_VIEW,EDIT_CTC, DELETE_CTC, SEARCH_CTC, SORT_CTC, ADD_ACT, DELETE_ACT, ADD_PAYM, EDIT_ACT, EDIT_PAYM, SORT_BY_DATE, ADD_CLIENT_TO_BLACK_LIST, DELETE_CLIENT_FROM_BLACK_LIST } from "../Constants"

export function ViewContracts(contractList, link, header){
    return {
        type: VIEW_CTC,
        payload: contractList,
        link: link, 
        header: header
    }
}

export function UpdateViewContracts(contractList, link, header, tab){
    return {
        type: UPDATE_CTC_VIEW,
        payload: contractList,
        link: link, 
        rowHeader: header,
        currentTab: tab
    }
}

export function EditContract(contractId){
    return {
        type: EDIT_CTC,
        payload: contractId
    }
}

export function DeleteContract(contractId){
    return {
        type: DELETE_CTC,
        payload: contractId
    }
}

export function SearchContract(contracts, keyword, index){
    return {
        type: SEARCH_CTC,
        keyword: keyword,
        index: index,
        contracts: contracts
    }
}

export function Sort(sortDirection, sortType){
    return {
        type: SORT_CTC,
        sortDirection: sortDirection,
        sortType: sortType
    }
}

export function AddNewAct(data){
    return{
        type: ADD_ACT,
        payload: data,
    }
}

export function DeleteAct(actInfo){
    return{
        type: DELETE_ACT,
        payload: actInfo
    }
} 

export function AddNewPayment(data){
    return{
        type: ADD_PAYM,
        payload: data,
    }
}

export function EditAct(data){
    return{
        type: EDIT_ACT,
        payload: data,
    }
}

export function EditPayment(data){
    return{
        type: EDIT_PAYM,
        payload: data,
    }
}

export function SignContract(contractData){
    return{
        type: EDIT_CTC,
        payload: contractData
    }
}

export function SortByDate(dateFrom, dateTo, sortDirection){
    return{
        type: SORT_BY_DATE,
        sortDirection: sortDirection,
        dateFrom: dateFrom,
        dateTo: dateTo
    }
}

export function AddNewClientToBlackList(newClient){
    return {
        type: ADD_CLIENT_TO_BLACK_LIST,
        payload: newClient
    }
}

export function DeleteClientFromBlackList(){
    return {
        type: DELETE_CLIENT_FROM_BLACK_LIST
    }
}
