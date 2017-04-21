/**
 * Created by lingxue on 2017/4/21.
 */
import { handleActions } from 'redux-actions';
import * as app from '../android_app.json';
import localStorage  from '../util/LocalStorage';
import localStorageKey  from '../util/LocalStorageKey';
import  * as actionTypes from '../actions/types';

const initialState = {
    userId : 0,
    username : '',
    userType : 0 ,
    userToken: ''
}

export default handleActions({
    [actionTypes.userTypes.USER_INFO_SET]: (state, action) => {
        const { payload: { data } } = action;
        let tempState = {
            ...state
        }
        if(data.userId){
            tempState = {
                ...state,
                userId : data.userId
            }
            localStorage.saveKey(localStorageKey.USER_ID,data.userId);
        }
        if(data.userToken){
            tempState = {
                ...state,
                userToken: data.userToken
            }
            localStorage.saveKey(localStorageKey.USER_TOKEN,data.userToken);
        }
        if(data.username){
            tempState = {
                ...state,
                username : data.username
            }
            localStorage.saveKey(localStorageKey.USER_LOGIN_NAME,data.username);
        }
        if(data.userToken){
            tempState = {
                ...state,
                userToken: data.userToken
            }
            localStorage.saveKey(localStorageKey.USER_TYPE,data.userType);
        }
        return tempState;
    }
}, initialState)