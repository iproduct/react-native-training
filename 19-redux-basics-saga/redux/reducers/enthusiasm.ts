import { EnthusiasmAction } from '../actions/enthusiasm-actions';
import { DECREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM, INCREMENT_ENTHUSIASM_ASYNC_START, INCREMENT_ENTHUSIASM_ASYNC_SUCCESS, INCREMENT_ENTHUSIASM_BY } from '../actions/enthusiasmActionTypes';

export interface EnthusiasmState {
    enthusiasmLevel: number;
    isLoading: boolean;
}

const initialState: EnthusiasmState = {
    enthusiasmLevel: 0,
    isLoading: false,
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
        case INCREMENT_ENTHUSIASM_ASYNC_START: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case INCREMENT_ENTHUSIASM_ASYNC_SUCCESS: {
            return {
                ...state,
                enthusiasmLevel: action.result,
                isLoading: false,
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