import { updateObject, findIndex } from '../../shared/utility';
import * as actionType from '../actions/actionType';

const initialState = {
    loading: false,
    shouldUpdate: true,
    responseList: []
}

const fetchHealthStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchHealthSuccess = (state, action) => {
    updateResponse(state.responseList, action.responseList)
    const shouldUpdate = compareProps(state.responseList, action.responseList);
    return updateObject(state, { loading: false, shouldUpdate: shouldUpdate });
}

const fetchHealthFail = (state, action) => {
    updateResponse(state.responseList, action.error.response)
    return updateObject(state, { loading: false, isHostResponding: false });
}

const compareProps = (prevProps, nextProps) => {
    return true
}

const updateResponse = (arr, val) => {
    const index = findIndex(arr, 'appName', val.appName);
    if (index >= 0) {
        arr[index].status = val.status
    }
    else {
        arr.push(val);
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.FETCH_HEALTH_START: return fetchHealthStart(state, action);
        case actionType.FETCH_HEALTH_SUCCESS: return fetchHealthSuccess(state, action);
        case actionType.FETCH_HEALTH_FAIL: return fetchHealthFail(state, action);
        default: return state;
    }
}

export default reducer;
