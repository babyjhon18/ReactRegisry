import { contractReduser } from "./Redusers";
import { combineReducers, createStore } from "redux";

const rootReduser = combineReducers({
    contract: contractReduser,
})

export const store = createStore(rootReduser);

