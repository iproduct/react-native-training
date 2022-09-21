import { CurrencyUpdate } from './../../model/currency-model';
import { START_SOCKET_SUBSCRIPTION } from '../actions/currencyActionTypes';
import { call, take, StrictEffect, fork, put } from 'redux-saga/effects';
import { wsConnect } from '../../service/currenciesSocketApi';
import { Socket } from 'socket.io-client';
import { EventChannel, eventChannel } from 'redux-saga';
import { currencyUpdated } from '../actions/currency-actions';

export function* currencyFlow() {
    while (true) {
        yield take(START_SOCKET_SUBSCRIPTION);
        const { socket, error } = yield call(wsConnect);
        if (error) {
            console.log('Error connecting to socket', error, socket);
        } else {
            console.log('Connection to socket succeeded', socket);
            yield fork(receiveUpdates, socket);
        }
    }
}

function* receiveUpdates(socket: Socket): Generator<StrictEffect, void, EventChannel<CurrencyUpdate>> {
    const channel = yield call(subscribe, socket);
    yield call(bridgeUpdatesToStore, channel);
}

function* bridgeUpdatesToStore(channel: EventChannel<CurrencyUpdate>): Generator<StrictEffect, void, CurrencyUpdate> {
    while(true) {
        let update = yield take(channel);
        yield put(currencyUpdated(update));
    }
}

function subscribe(socket: Socket) {
    return eventChannel(emit => {
        socket.on('currency', message => {
            console.log(message);
            emit(message);
        })
        socket.on('disconnect', message => {
            console.log("Disconnected from server.");
        })
        socket.on('error', err => {
            console.log('Error receiving messages:', err);
        })
        return () => { };
    })
}