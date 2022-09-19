import { DECREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM_ASYNC_START, INCREMENT_ENTHUSIASM_ASYNC_SUCCESS, INCREMENT_ENTHUSIASM_BY } from './actionTypes';
import { RootState } from './store';
import { ThunkAction } from 'redux-thunk';

export interface IncrementEnthusiasm {
    type: INCREMENT_ENTHUSIASM;
}

export interface IncrementEnthusiasmBy {
    type: INCREMENT_ENTHUSIASM_BY;
    amount: number;
}

export interface IncrementEnthusiasmAsyncStart {
    type: INCREMENT_ENTHUSIASM_ASYNC_START;
    value: number;
    amount: number;
}

export interface IncrementEnthusiasmAsyncSuccess {
    type: INCREMENT_ENTHUSIASM_ASYNC_SUCCESS;
    result: number;
}

export interface DecrementEnthusiasm {
    type: DECREMENT_ENTHUSIASM;
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm | IncrementEnthusiasmBy
    | IncrementEnthusiasmAsyncStart | IncrementEnthusiasmAsyncSuccess


export function incrementEnthusiasm(): IncrementEnthusiasm {
    return {
        type: INCREMENT_ENTHUSIASM,
    };
}

export function incrementEnthusiasmBy(amount: number): IncrementEnthusiasmBy {
    return {
        type: INCREMENT_ENTHUSIASM_BY,
        amount,
    };
}

export function incrementEnthusiasmAsyncStart(value: number, amount: number): IncrementEnthusiasmAsyncStart {
    return {
        type: INCREMENT_ENTHUSIASM_ASYNC_START,
        value,
        amount,
    };
}

export function incrementEnthusiasmAsyncSuccess(result: number): IncrementEnthusiasmAsyncSuccess {
    return {
        type: INCREMENT_ENTHUSIASM_ASYNC_SUCCESS,
        result,
    };
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
    return {
        type: DECREMENT_ENTHUSIASM,
    };
}


