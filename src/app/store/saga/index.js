import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionType';
import { fetchHelthSaga } from './health';

export function* watchHealthFetch(){
    yield takeEvery(actionTypes.FETCH_HEALTH, fetchHelthSaga);
}
