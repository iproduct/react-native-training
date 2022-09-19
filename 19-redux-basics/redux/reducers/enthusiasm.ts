import { EnthusiasmAction } from '../actions';
import { DECREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM_BY } from './../actionTypes';

export interface EnthusiasmState {
    enthusiasmLevel: number;
}

const initialState: EnthusiasmState = {
    enthusiasmLevel: 0
};

export default function (state = initialState, action: EnthusiasmAction) {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM: {
            return {
                ...state,
                enthusiasmLevel: state.enthusiasmLevel + 1,
            };
        }
        case INCREMENT_ENTHUSIASM_BY: {
            return {
                ...state,
                enthusiasmLevel: state.enthusiasmLevel + action.amount,
            };
        }
        case DECREMENT_ENTHUSIASM: {
            return {
                ...state,
                enthusiasmLevel: Math.max(0, state.enthusiasmLevel - 1),
            };
        }
        default:
            return state;
    }
}