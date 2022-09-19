import { DECREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM_BY } from './actionTypes';
import { RootState } from './store';
import { ThunkAction } from 'redux-thunk';

export interface IncrementEnthusiasm {
    type: INCREMENT_ENTHUSIASM;
}

export interface IncrementEnthusiasmBy {
    type: INCREMENT_ENTHUSIASM_BY;
    amount: number;
}

export interface DecrementEnthusiasm {
    type: DECREMENT_ENTHUSIASM;
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm | IncrementEnthusiasmBy


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

export function decrementEnthusiasm(): DecrementEnthusiasm {
    return {
        type: DECREMENT_ENTHUSIASM,
    };
}

export const incrementLogged = (amount: number = 1): ThunkAction<void, RootState, undefined, EnthusiasmAction> =>
    (dispatch, getState) => {
        const stateBefore = getState()
        console.log(`Counter before: ${stateBefore.enthusiasm.enthusiasmLevel}`)
        dispatch(incrementEnthusiasmBy(amount))
        const stateAfter = getState()
        console.log(`Counter after: ${stateAfter.enthusiasm.enthusiasmLevel}`)
    }

export const incrementAsync = (amount: number = 1, delay_ms: number = 3000): ThunkAction<void, RootState, undefined, EnthusiasmAction> =>
    (dispatch, getState) => {
        const stateBefore = getState()
        console.log(`Counter before: ${stateBefore.enthusiasm.enthusiasmLevel}`)
        setTimeout(() => {
            dispatch(incrementEnthusiasmBy(amount));
            const stateAfter = getState();
            console.log(`Counter after: ${stateAfter.enthusiasm.enthusiasmLevel}`)
        }, delay_ms);
    }
