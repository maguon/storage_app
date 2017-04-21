import { handleActions } from 'redux-actions';
import * as app from '../android_app.json';
import localStorageKey  from '../util/LocalStorageKey';
import  * as actionTypes from '../actions/types';

const initialState = {
    version: app.version,
    lastVersion : app.version,
    newFlag : true,
    updateFlag: false
}


export default handleActions({
    [actionTypes.appTypes.APP_VERSION_GET]: (state, action) => {
        const { payload: { data } } = action;
        let tempState = {
            ...state
        }

        if(data.version>state.version){
            tempState = {
                ...state,
                newFlag :false
            }
            if(data.force_update==1){
                tempState = {
                    ...state,
                    updateFlag :true
                }
            }
        }
        return  tempState;
    }
}, initialState)