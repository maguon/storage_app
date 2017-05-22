import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isLoginWaiting: false,
    isLoginSuccess: false,
    isJump: false,
    user: {
        // userId: 38,
        // token: 'FvocqWoSwbzrv_4ScNX7amMUWC8=lwHMeYf_cd030af3c0146effcede4b0fbc37be14d0fce351eb6e8da42930c91ab9c09f799c7864b69158d22a754dd14e5f70f019s',
        // userType: 1,
        // userStatus: 1,
        // mobile: '18888'
        userId: 0,
        token: '',
        userType: 1,
        userStatus: 1,
        mobile: ''
    }
}

export default handleActions({
    [actionTypes.loginTypes.LOGIN_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        console.log('data', data)
        return {
            ...state,
            isLoginWaiting: false,
            isLoginSuccess: true,
            isJump: true,
            user: data
        }
    },
    [actionTypes.loginTypes.LOGIN_FAILED]: (state, action) => {
        return {
            ...state,
            isLoginWaiting: false,
            isLoginSuccess: false,
            isJump: true
        }
    },
    [actionTypes.loginTypes.LOGIN_WAITING]: (state, action) => {
        return {
            ...state,
            isLoginWaiting: true
        }
    }
}, initialState)