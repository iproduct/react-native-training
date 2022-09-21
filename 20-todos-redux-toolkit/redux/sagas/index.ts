
import {all, fork} from 'redux-saga/effects';
import { initSaga, watchGetTodos } from "./todos";

export const rootSaga = function* root() {
    yield all([fork(initSaga), fork(watchGetTodos)])
}

