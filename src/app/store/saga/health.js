import { put, call } from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../service/Proxy';

export function* fetchHelthSaga(action) {
    console.log('generator function----', action);
    yield put(actions.fetchHealthStart());
    yield action.urlList.map(host => call(updateResponseList, host))  
}

function* updateResponseList(host){
    console.log('updateResponseList__',host);
    try {
        const resp = yield api.get(host.url)
        const r = { appName: host.app, status: resp.data.status };
        console.log('fetched___', r)
        yield put(actions.fetchHealthSuccess(r));
    } catch (error) {
        yield put(actions.fetchHealthFail(error));
    }
}



