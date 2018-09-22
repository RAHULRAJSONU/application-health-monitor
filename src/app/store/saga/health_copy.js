import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import api from '../../service/Proxy';

export function* fetchHelthSaga(action) {
    console.log('generator function----', action);
    yield put(actions.fetchHealthStart());
    try {
        const responses = [];
        //const responses = yield fetchInBulk(action.urlList);
        // for (let key in action.urlList) {
        //     console.log('fetching in bulk', action.urlList);
        //     const response = yield api.get(action.urlList[key].url);
        //     response.then(resp => {
        //         responses.push({ appName: action.urlList[key].app, status: resp.data.status });
        //     })
        // };
        yield action.urlList.map(url => {
            const d = fetchApi1(url)
            responses.push(d)
        })
        console.log('fetched___', responses)
        yield put(actions.fetchHealthSuccess(responses));
    } catch (error) {
        yield put(actions.fetchHealthFail(error));
    }
}

const fetchApi = (host) => {
    console.log('fetchApi+++++', host)
    const response = api.get(host.url);
    return response.then(
        resp => {
            const res = { appName: host.app, status: resp.data.status };
            console.log('inside call__', res);
            return res;
        });
}

async function fetchApi1(host){
    
    try {
        const resp = await api.get(host.url);
        console.log(resp);
        return { appName: host.app, status: resp.data.status };
    } catch (error) {
        console.log('error----',error);
    }
}

const fetchInBulk = (hostList) => {
    const responses = [];
    for (let key in hostList) {
        console.log('fetching in bulk', hostList);
        const response = api.get(hostList[key].url);
        response.then(resp => {
            responses.push({ appName: hostList[key].app, status: resp.data.status });
            console.log("resp-->", resp.data.status)
        })
    };

    return responses;
}

