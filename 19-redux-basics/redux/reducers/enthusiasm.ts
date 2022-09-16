import { EnthusiasmAction } from '../actions';
import { DECREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM } from './../actionTypes';

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