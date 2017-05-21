/**
 * Created by rbyu on 2017/5/19.
 */
import { handleActions } from 'redux-actions'
import * as app from '../android_app.json'
import localStorageKey from '../util/LocalStorageKey'
import * as actionTypes from '../actions/actionTypes'



const initialState = {
    version: app.version,
    lastVersion: app.version,
    force_update: 0,
    url: '',
    remark: '',
    isVersionValidating: false,
    isTokenValidating: false,
    errMsg: '',
    nextStep: 'login',
    isJump: false
}

export default handleActions({
    [actionTypes.welcomeActionTypes.GET_VERSION_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        data.sort((a, b) => {
            return b.id - a.id
        })
        const { version, force_update, url, remark } = data.shift()

        return {
            ...state,
            lastVersion: version,
            force_update,
            url,
            remark,
            isVersionValidating: false
        }
    },
    [actionTypes.welcomeActionTypes.GET_VERSION_WAITING]: (state, action) => {

        return {
            ...state,
            isVersionValidating: true
        }
    },
    [actionTypes.welcomeActionTypes.GET_VERSION_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isVersionValidating: false
        }
    },
    [actionTypes.welcomeActionTypes.VALIDATE_TOKEN_SUCCESS]: (state, action) => {
        return {
            ...state,
            isTokenValidating: false,
            nextStep: 'main',
            isJump: true
        }
    },
    [actionTypes.welcomeActionTypes.VALIDATE_TOKEN_FAILED]: (state, action) => {
        return {
            ...state,
            isTokenValidating: false,
            nextStep: 'login',
            isJump: true
        }
    },
    [actionTypes.welcomeActionTypes.VALIDATE_TOKEN_WAITING]: (state, action) => {
        return {
            ...state,
            isTokenValidating: true
        }
    }
}, initialState)



