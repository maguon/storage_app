import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    // isLoginWaiting: false,
    // isLoginSuccess: false,
    // isJump: false,
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
    },
    isResultStatus: 0,
    isExecStatus: 0,
    errorMsg: '',
    failedMsg: '',
}

export default handleActions({
    [actionTypes.loginTypes.LOGIN_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isResultStatus: 0,
            isExecStatus: 2,
            user: data
        }
    },
    [actionTypes.loginTypes.LOGIN_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isResultStatus: 2,
            isExecStatus: 2,
            failedMsg: data
        }
    },
    [actionTypes.loginTypes.LOGIN_WAITING]: (state, action) => {
        return {
            ...state,
            isExecStatus: 1,
        }
    },
    [actionTypes.loginTypes.LOGIN_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isResultStatus: 1,
            isExecStatus: 2,
            errorMsg: data
        }
    },
    [actionTypes.loginTypes.RESET_LOGIN]: (state, action) => {
        return {
            ...state,
            isExecStatus: 0,
        }
    },
}, initialState)