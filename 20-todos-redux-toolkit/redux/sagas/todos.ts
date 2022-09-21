import { apply, call, CallEffect, Effect, put, StrictEffect, take } from 'redux-saga/effects';
import { TodosAPI } from '../../api/rest-api-client';
import { Todo } from '../../model/todo.model';
import { fetchStart, fetchSuccess } from '../todos-slice';

export function* initSaga(): Generator<StrictEffect, void, Effect> {
    yield put(fetchStart());
}

export function* watchGetTodos(): Generator<StrictEffect, void, Todo[]> {
    yield take('todos/fetchStart');
    const todos = yield apply(TodosAPI, TodosAPI.findAll, []);
    yield put(fetchSuccess(todos))
}