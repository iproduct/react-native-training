import { EnthusiasmAction, IncrementEnthusiasmAsyncStart, incrementEnthusiasmAsyncSuccess } from '../actions/enthusiasm-actions';
import { INCREMENT_ENTHUSIASM_ASYNC_START } from '../actions/enthusiasmActionTypes';
import {takeEvery, call, StrictEffect, put, takeLatest} from 'redux-saga/effects';
import { Action } from 'redux';
import { incrementAsyncService } from '../../api/number-genrator-api';


export function* watchIncrementAsyncRequestStart(){
    yield  takeLatest(INCREMENT_ENTHUSIASM_ASYNC_START, requestIncrementAsync);
}

function* requestIncrementAsync(action: IncrementEnthusiasmAsyncStart): Generator<StrictEffect, void, number>  {
    const result = yield call(incrementAsyncService, action.value, action.amount)
    yield put(incrementEnthusiasmAsyncSuccess(result))
}