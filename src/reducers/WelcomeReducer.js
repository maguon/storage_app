/**
 * Created by rbyu on 2017/5/19.
 */
import { handleActions } from 'redux-actions'
import * as app from '../android_app.json'
import localStorageKey from '../util/LocalStorageKey'
import * as actionTypes from '../actions/actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    getVersion: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            version: app.version,
            lastVersion: app.version,
            force_update: 0,
            url: '',
            remark: ''
        }
    },
    valdateToken: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.welcomeActionTypes.GET_VERSION_WAITING]: (state, action) => {
        return {
            ...state,
            getVersion: {
                ...state.getVersion,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.welcomeActionTypes.GET_VERSION_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getVersion: {
                ...state.getVersion,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data,
            }
        }
    },
    [actionTypes.welcomeActionTypes.GET_VERSION_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        data.sort((a, b) => {
            return b.id - a.id
        })
        const { version, force_update, url, remark } = data.shift()
        return {
            ...state,
            getVersion: {
                ...state.getVersion,
                data: {
                    ...state.getVersion.data,
                    lastVersion: version,
                    force_update: force_update,
                    url: url,
                    remark: remark
                },
                isExecStatus: 2,
                isResultStatus: 0
            }
        }
    },
    [actionTypes.welcomeActionTypes.GET_VERSION_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getVersion: {
                ...state.getVersion,
                failedMsg: data,
                isExecStatus: 2,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.welcomeActionTypes.VALIDATE_TOKEN_WAITING]: (state, action) => {
        return {
            ...state,
            valdateToken: {
                ...state.valdateToken,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.welcomeActionTypes.VALIDATE_TOKEN_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            valdateToken: {
                ...state.valdateToken,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    },
    [actionTypes.welcomeActionTypes.VALIDATE_TOKEN_SUCCESS]: (state, action) => {
        return {
            ...state,
            valdateToken: {
                ...state.valdateToken,
                isExecStatus: 2,
                isResultStatus: 0,
            }
        }
    },
    [actionTypes.welcomeActionTypes.VALIDATE_TOKEN_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            valdateToken: {
                ...state.valdateToken,
                failedMsg: data,
                isExecStatus: 2,
                isResultStatus: 2
            }
        }
    }

}, initialState)



