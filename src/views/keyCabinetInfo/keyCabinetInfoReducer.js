import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        keyList: []
    },
    getKeyList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.keyCabinetInfo.get_keyList_success]: (state, action) => {
        const { payload: { keyList } } = action
        return {
            data: {
                keyList
            },
            getKeyList: {
                ...state.getKeyList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.keyCabinetInfo.get_keyList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getKeyList: {
                ...state.getKeyList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.keyCabinetInfo.get_keyList_waiting]: (state, action) => {
        return {
            ...state,
            getKeyList: {
                ...state.getKeyList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.keyCabinetInfo.get_keyList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getKeyList: {
                ...state.getKeyList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)