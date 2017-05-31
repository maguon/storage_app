/**
 * Created by lingxue on 2017/4/17.
 */
import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    getStorageList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            storageList: []
        }
    }
}

export default handleActions({
    [actionTypes.storageListTypes.GET_STORAGELIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            getStorageList: {
                ...state.getStorageList,
                isExecStatus: 2,
                isResultStatus: 0,
                data: {
                    storageList: data
                }
            }
        }
    },
    [actionTypes.storageListTypes.GET_STORAGELIST_WAITING]: (state, action) => {
        return {
            getStorageList: {
                ...state.getStorageList,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.storageListTypes.GET_STORAGELIST_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            getStorageList: {
                ...state.getStorageList,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    },
    [actionTypes.storageListTypes.GET_STORAGELIST_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            getStorageList: {
                ...state.getStorageList,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    }
}, initialState)