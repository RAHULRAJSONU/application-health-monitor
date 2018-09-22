import * as actionType from '../actions/actionType';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    responseList: []
}

const fetchHealthStart = (state, action)=>{
    return updateObject(state,{loading:true});
}

const fetchHealthSuccess = (state, action) => {
    console.log('Reducer__',action);
    return updateObject(state,{
        responseList: action.responseList,
        loading: false
    });
}

const fetchHealthFail = (state,action) => {
    return updateObject(state,{loading:false});
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionType.FETCH_HEALTH_START: return fetchHealthStart(state, action);
        case actionType.FETCH_HEALTH_SUCCESS: return fetchHealthSuccess(state, action);
        case actionType.FETCH_HEALTH_FAIL: return fetchHealthFail(state,action);
        default: return state;
    }
}

export default reducer;
