/**
 * Created by lingxue on 2017/4/17.
 */
import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    getSelectStorageListForCarList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            selectStorageListForCarList: []
        }
    },
    selectStorageListForCarList: {
        storage_name: '所有车辆',
        id: 0
    }
}

export default handleActions({
    [actionTypes.selectStorageForCarListTypes.GET_SELECTSTORAGELISTFORCARLIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getSelectStorageListForCarList: {
                ...state.getSelectStorageListForCarList,
                isExecStatus: 2,
                isResultStatus: 0,
                data: {
                    selectStorageListForCarList: [{ storage_name: '所有车辆', id: 0 }, ...data]
                }
            }
        }
    },
    [actionTypes.selectStorageForCarListTypes.GET_SELECTSTORAGELISTFORCARLIST_WAITING]: (state, action) => {
        return {
            ...state,
            getSelectStorageListForCarList: {
                ...state.getSelectStorageListForCarList,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.selectStorageForCarListTypes.GET_SELECTSTORAGELISTFORCARLIST_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getSelectStorageListForCarList: {
                ...state.getSelectStorageListForCarList,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    },
    [actionTypes.selectStorageForCarListTypes.GET_SELECTSTORAGELISTFORCARLIST_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getSelectStorageListForCarList: {
                ...state.getSelectStorageListForCarList,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.selectStorageForCarListTypes.RESET_SELECTSTORAGELISTFORCARLIST]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getSelectStorageListForCarList: {
                ...state.getSelectStorageListForCarList,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.selectStorageForCarListTypes.SELECT_STORAGELISTFORCARLIST]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            selectStorageListForCarList: {
                storage_name: data.storage_name,
                id: data.id
            }
        }
    }
}, initialState)