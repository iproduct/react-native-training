import { watchIncrementAsyncRequestStart } from "./increment-saga"
import {all, fork} from 'redux-saga/effects';
import { watchSuggestionRequested } from "./suggestions-saga";
import { currencyFlow } from "./currency";

export const rootSaga = function* root() {
    yield all([fork(watchIncrementAsyncRequestStart), fork(watchSuggestionRequested), fork(currencyFlow)])
}