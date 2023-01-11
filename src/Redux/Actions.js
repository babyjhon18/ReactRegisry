import { VIEW_CTC, UPDATE_CTC_VIEW,EDIT_CTC, DELETE_CTC, SEARCH_CTC, SORT_CTC } from "../Constants"

export function ViewContracts(contractList, link, header){
    return {
        type: VIEW_CTC,
        payload: contractList,
        link: link, 
        header: header
    }
}

export function UpdateViewContracts(contractList, link, header){
    return {
        type: UPDATE_CTC_VIEW,
        payload: contractList,
        link: link, 
        rowHeader: header
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

export function Sort(sortDirection){
    return {
        type: SORT_CTC,
        sortDirection: sortDirection
    }
}