import { put, call } from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../service/Proxy';

export function* fetchHelthSaga(action) {
    yield put(actions.fetchHealthStart());
    yield action.urlList.map(host => call(updateResponseList, host))  
}

function* updateResponseList(host){
    let r = {};
    try {
        const resp = yield api.get(host.url)
        r = { appName: host.app, status: resp.data.status, isHostResponding: true };
        yield put(actions.fetchHealthSuccess(r));
    } catch (error) {
        r = { appName: host.app, status: "down", isHostResponding: false };
        const errResp = {error:error,response:r};
        yield put(actions.fetchHealthFail(errResp));
    }
}



