import * as actionType from './actionType';

export const fetchHealth=(urlList) => {
    return {
        type: actionType.FETCH_HEALTH,
        urlList: urlList
    }
}

export const fetchHealthStart = () => {
    return {
        type: actionType.FETCH_HEALTH_START
    }
}

export const fetchHealthSuccess = (responses) => {
    return {
        type: actionType.FETCH_HEALTH_SUCCESS,
        responseList: responses
    }
}

export const fetchHealthFail = (error) => {
    return {
        type: actionType.FETCH_HEALTH_FAIL,
        error: error
    }
}