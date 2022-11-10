import { VIEW_CTC, EDIT_CTC, DELETE_CTC, SEARCH_CTC } from "../Constants"

export function ViewContracts(contractList){
    return {
        type: VIEW_CTC,
        payload: contractList
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

export function SearchContract(keyWord){
    return {
        type: SEARCH_CTC,
        payload: keyWord
    }
}