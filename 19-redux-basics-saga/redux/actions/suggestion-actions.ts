import { SUGGESTION_REQUESTED, SUGGESTION_REQUEST_COMPLETED, SUGGESTION_REQUEST_CANCELED } from './suggestionActionTypes';

export interface SuggestionRequested {
    type: SUGGESTION_REQUESTED;
}

export interface SuggestionRequestCompleted {
    type: SUGGESTION_REQUEST_COMPLETED;
    suggestion: number[];
}

export interface SuggestionRequestCanceled {
    type: SUGGESTION_REQUEST_CANCELED;
}

export type SuggestionsAction =  SuggestionRequested | SuggestionRequestCompleted | SuggestionRequestCanceled


export function suggestionRequested(): SuggestionRequested {
    return {
        type: SUGGESTION_REQUESTED,
    };
}

export function suggestionRequestCompleted(suggestion: number[]): SuggestionRequestCompleted {
    return {
        type: SUGGESTION_REQUEST_COMPLETED,
        suggestion,
    };
}

export function suggestionRequestCanceled(): SuggestionRequestCanceled {
    return {
        type: SUGGESTION_REQUEST_CANCELED,
    };
}


