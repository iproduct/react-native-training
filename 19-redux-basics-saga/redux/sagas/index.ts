import { watchIncrementAsyncRequestStart } from "./increment-saga"
import {all, fork} from 'redux-saga/effects';

export const rootSaga = function* root() {
    yield all([fork(watchIncrementAsyncRequestStart)])
}