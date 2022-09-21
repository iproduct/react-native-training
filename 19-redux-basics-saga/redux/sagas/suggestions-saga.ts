import { SUGGESTION_REQUESTED, SUGGESTION_REQUEST_CANCELED} from '../actions/suggestionActionTypes';
import { call, StrictEffect, put, takeLatest, race, take, TakeEffect, all } from 'redux-saga/effects';
import { suggestionRequestCompleted, SuggestionRequested } from '../actions/suggestion-actions';
import { getAnotherSuggestion, getSuggestion } from '../../api/suggestions-api';


export function* watchSuggestionRequested() {
    yield takeLatest(SUGGESTION_REQUESTED, requestSuggestion);
}

function* requestSuggestion(): Generator<StrictEffect, void, { suggestion: number[], cancel: TakeEffect }> {
    const { suggestion, cancel } = yield race({
        suggestion: call(fetchAllSuggestions),
        cancel: take(SUGGESTION_REQUEST_CANCELED)
    })
    console.log(cancel)
    if (!cancel) {
        yield put(suggestionRequestCompleted(suggestion))
    }
}

function* fetchAllSuggestions(): Generator<StrictEffect, number[], number[] > {
    return yield all([call(getSuggestion), call(getAnotherSuggestion)])
}