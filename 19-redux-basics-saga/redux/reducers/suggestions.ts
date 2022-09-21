import { SuggestionsAction } from './../actions/suggestion-actions';
import { SUGGESTION_REQUESTED, SUGGESTION_REQUEST_COMPLETED, SUGGESTION_REQUEST_CANCELED  } from '../actions/suggestionActionTypes';

export interface SuggestionsState {
    suggestions: number[];
    isLoading: boolean;
}

const initialState: SuggestionsState = {
    suggestions: [],
    isLoading: false,
};

export default function (state = initialState, action: SuggestionsAction) {
    switch (action.type) {
        case SUGGESTION_REQUESTED: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case SUGGESTION_REQUEST_COMPLETED: {
            return {
                ...state,
                suggestions: state.suggestions.concat(action.suggestion),
                isLoading: false,
            };
        }
        case SUGGESTION_REQUEST_CANCELED: {
            return {
                ...state,
                isLoading: false,
            };
        }
        default:
            return state;
    }
}