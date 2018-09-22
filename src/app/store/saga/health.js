import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../service/Proxy';

export function* fetchHelthSaga(action) {
    console.log('generator function----', action);
    yield put(actions.fetchHealthStart());
    try {
        const responses = [];
        console.log('*****',action.urlList[0].url)
        const resp = yield api.get(action.urlList[0].url)
        responses.push({ appName: action.urlList[0].app, status: resp.data.status })
        console.log('fetched___', responses)
        yield put(actions.fetchHealthSuccess(responses));
    } catch (error) {
        yield put(actions.fetchHealthFail(error));
    }
}



