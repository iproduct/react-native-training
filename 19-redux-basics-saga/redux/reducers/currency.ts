import { CURRENCY_UPDATED, START_SOCKET_SUBSCRIPTION } from './../actions/currencyActionTypes';
import { CurrencyUpdate } from './../../model/currency-model';
import { CurrencyAction } from '../actions/currency-actions';
import { STOP_SOCKET_SUBSCRIPTION } from '../actions/currencyActionTypes';

export interface CurrencyState {
    updates: CurrencyUpdate[];
    active: boolean;
}

const initialState: CurrencyState = {
    updates: [],
    active: false,
};

export default function (state = initialState, action: CurrencyAction) {
    switch (action.type) {
        case START_SOCKET_SUBSCRIPTION: {
            return {
                ...state,
                active: true,
            };
        }
        case STOP_SOCKET_SUBSCRIPTION: {
            return {
                ...state,
                active: false,
            };
        }
        case CURRENCY_UPDATED: {
            return {
                ...state,
                updates: state.updates.concat(action.payload),
            };
        }
        default:
            return state;
    }
}