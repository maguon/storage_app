import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    getStoragesHome: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            storageList: []
        }
    },
    getRecordsHome: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            recordList: []
        }
    }
}

export default handleActions({
    [actionTypes.homeTypes.GET_STORAGES_HOME_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getStoragesHome: {
                ...state.getStoragesHome,
                isExecStatus: 2,
                isResultStatus: 0,
                data: {
                    ...state.getStoragesHome.data,
                    storageList: data
                }
            }
        }
    },
    [actionTypes.homeTypes.GET_STORAGES_HOME_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getStoragesHome: {
                ...state.getStoragesHome,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.homeTypes.GET_STORAGES_HOME_WAITING]: (state, action) => {
        return {
            ...state,
            getStoragesHome: {
                ...state.getStoragesHome,
                isExecStatus: 1,
            }
        }
    },
    [actionTypes.homeTypes.GET_STORAGES_HOME_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getStoragesHome: {
                ...state.getStoragesHome,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    },
    [actionTypes.homeTypes.GET_RECORDS_HOME_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRecordsHome: {
                ...state.getRecordsHome,
                isExecStatus: 2,
                isResultStatus: 0,
                data: {
                    ...state.getRecordsHome.data,
                    recordList: data
                }
            }
        }
    },
    [actionTypes.homeTypes.GET_RECORDS_HOME_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRecordsHome: {
                ...state.getRecordsHome,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.homeTypes.GET_RECORDS_HOME_WAITING]: (state, action) => {
        return {
            ...state,
            getRecordsHome: {
                ...state.getRecordsHome,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.homeTypes.GET_RECORDS_HOME_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRecordsHome: {
                ...state.getRecordsHome,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    },
    [actionTypes.homeTypes.RESET_GET_RECORDS_HOME]: (state, action) => {
        return {
            ...state,
            getRecordsHome: {
                ...state.getRecordsHome,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.homeTypes.RESET_GET_STORAGES_HOME]: (state, action) => {
        return {
            ...state,
            getStoragesHome: {
                ...state.getStoragesHome,
                isExecStatus: 0
            }
        }
    }
}, initialState)
