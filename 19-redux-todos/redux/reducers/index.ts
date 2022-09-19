import { combineReducers } from "redux";
import todos, { TodosState } from "./todos";

export interface StoreState {
    todos: TodosState,
}

export default combineReducers({ todos });