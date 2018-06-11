import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        makeList: []
    },
    getMakeList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.makeList.get_makeList_success]: (state, action) => {
        const { payload: { makeList } } = action
        return {
            data: {
                makeList
            },
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.makeList.get_makeList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.makeList.get_makeList_waiting]: (state, action) => {
        return {
            ...state,
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.makeList.get_makeList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getMakeList: {
                ...state.getMakeList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)