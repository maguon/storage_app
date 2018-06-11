import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        entrustList: []
    },
    getEntrustList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.entrustList.get_entrustList_success]: (state, action) => {
        const { payload: { entrustList } } = action
        return {
            data: {
                entrustList
            },
            getEntrustList: {
                ...state.getEntrustList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.entrustList.get_entrustList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getEntrustList: {
                ...state.getEntrustList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.entrustList.get_entrustList_waiting]: (state, action) => {
        return {
            ...state,
            getEntrustList: {
                ...state.getEntrustList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.entrustList.get_entrustList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getEntrustList: {
                ...state.getEntrustList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)