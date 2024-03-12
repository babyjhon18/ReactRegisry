import { contractReduser } from "./ContractReduser";
import { messagesReduser } from "./MessagesReduser";
import { combineReducers, createStore } from "redux";

const rootReduser = combineReducers({
    contractReduser: contractReduser,
    messagesReduser: messagesReduser,
})

export const store = createStore(rootReduser);

