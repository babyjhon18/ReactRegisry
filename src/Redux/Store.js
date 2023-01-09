import { contractReduser } from "./ContractReduser";
import { combineReducers, createStore } from "redux";

const rootReduser = combineReducers({
    contractReduser: contractReduser,
})

export const store = createStore(rootReduser);

