import { EnthusiasmAction, IncrementEnthusiasmAsyncStart, incrementEnthusiasmAsyncSuccess } from './../actions';
import { INCREMENT_ENTHUSIASM_ASYNC_START } from './../actionTypes';
import {takeEvery, call, StrictEffect, put} from 'redux-saga/effects';
import { Action } from 'redux';
import { incrementAsyncService } from '../../api/number-genrator-api';


export function* watchIncrementAsyncRequestStart(){
    yield  takeEvery(INCREMENT_ENTHUSIASM_ASYNC_START, requestIncrementAsync);
}

function* requestIncrementAsync(action: IncrementEnthusiasmAsyncStart): Generator<StrictEffect, void, number>  {
    const result = yield call(incrementAsyncService, action.value, action.amount)
    yield put(incrementEnthusiasmAsyncSuccess(result))
}