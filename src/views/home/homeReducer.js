import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        storageList: []
    },
    getStorageList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.home.get_storageListForHome_success]: (state, action) => {
        const { payload: { storageList } } = action
        return {
            data: {
                storageList
            },
            getStorageList: {
                ...state.getStorageList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.home.get_storageListForHome_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getStorageList: {
                ...state.getStorageList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.home.get_storageListForHome_waiting]: (state, action) => {
        return {
            ...state,
            getStorageList: {
                ...state.getStorageList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.home.get_storageListForHome_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getStorageList: {
                ...state.getStorageList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)