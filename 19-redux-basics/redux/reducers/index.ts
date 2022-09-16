import { combineReducers } from "redux";
import enthusiasm, { EnthusiasmState } from "./enthusiasm";

export interface StoreState {
    enthusiasm: EnthusiasmState
}

export default combineReducers({ enthusiasm });