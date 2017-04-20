import { handleActions } from 'redux-actions';
import * as app from '../android_app.json';
import localStorageKey  from '../util/LocalStorageKey';
import  * as actionTypes from '../actions/types';

const initialState = {
    version: app.version,
    lastVersion : app.version,
    updateFlag: false,
    userToken : ' ',
    userId : 0,
    welcomeFlag : localStorageKey.WELCOME_FLAG_SHOWN_NOT
}


export default handleActions({
    [actionTypes.appTypes.APP_VERSION_GET]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            lastVersion:data.version
        }
    },
    [actionTypes.appTypes.APP_USER_SET]: (state, action) => {
        const { payload: { data } } = action;
        let tempState = {
            ...state
        }
        if(data.userId){
            tempState = {
                ...state,
                userId : data.userId
            }
        }
        if(data.userToken){
            tempState = {
                ...state,
                userToken: data.userToken
            }
        }
        return tempState;
    }
}, initialState)