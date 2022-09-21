import currency, { CurrencyState } from './currency';
import suggestions, { SuggestionsState } from './suggestions';
import { combineReducers } from "redux";
import enthusiasm, { EnthusiasmState } from "./enthusiasm";

export interface StoreState {
    enthusiasm: EnthusiasmState,
    suggestions: SuggestionsState,
    currency: CurrencyState,
}

export default combineReducers({ enthusiasm, suggestions, currency });