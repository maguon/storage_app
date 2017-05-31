import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    getStorageParkingList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            sorageParkingList: []
        }
    }
}

export default handleActions({
    [actionTypes.selectRowTypes.GET_STORAGEPARKINGS_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            getStorageParkingList: {
                ...state.getStorageParkingList,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    },
    [actionTypes.selectRowTypes.GET_STORAGEPARKINGS_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            getStorageParkingList: {
                ...state.getStorageParkingList,
                isExecStatus: 2,
                isResultStatus: 0,
                data: {
                    sorageParkingList: data
                }
            }
        }
    },
    [actionTypes.selectRowTypes.GET_STORAGEPARKINGS_WAITING]: (state, action) => {
        return {
            getStorageParkingList: {
                ...state.getStorageParkingList,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.selectRowTypes.GET_STORAGEPARKINGS_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            getStorageParkingList: {
                ...state.getStorageParkingList,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    }
}, initialState)