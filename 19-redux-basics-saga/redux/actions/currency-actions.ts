import { CurrencyUpdate } from '../../model/currency-model';
import { CURRENCIES_REQUEST_CANCEL, CURRENCIES_REQUEST_START, CURRENCY_UPDATED, START_SOCKET_SUBSCRIPTION, STOP_SOCKET_SUBSCRIPTION } from './currencyActionTypes';

export interface StartSocketSubscription {
    type: START_SOCKET_SUBSCRIPTION;
}

export interface StopSocketSubscription {
    type: STOP_SOCKET_SUBSCRIPTION;
}

export interface CurrenciesRequestStart {
    type: CURRENCIES_REQUEST_START;
}

export interface CurrenciesRequestCancel {
    type: CURRENCIES_REQUEST_CANCEL;
}

export interface CurrencyUpdated {
    type: CURRENCY_UPDATED;
    payload: CurrencyUpdate;
}

export type CurrencyAction = StartSocketSubscription | StopSocketSubscription | CurrenciesRequestStart
    | CurrenciesRequestCancel | CurrencyUpdated;



export function startSocketSubscription(): StartSocketSubscription {
    return {
        type: START_SOCKET_SUBSCRIPTION,
    };
}

export function stopSocketSubscription(): StopSocketSubscription {
    return {
        type: STOP_SOCKET_SUBSCRIPTION,
    };
}

export function currenciesRequestStart(): CurrenciesRequestStart {
    return {
        type: CURRENCIES_REQUEST_START,
    };
}

export function currenciesRequestCancel(): CurrenciesRequestCancel {
    return {
        type: CURRENCIES_REQUEST_CANCEL,
    };
}

export function currencyUpdated(payload: CurrencyUpdate): CurrencyUpdated {
    return {
        type: CURRENCY_UPDATED,
        payload,
    };
}