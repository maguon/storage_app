import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        keyCabinetList: []
    },
    getKeyCabinetList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.keyCabinetList.get_keyCabinetList_success]: (state, action) => {
        const { payload: { keyCabinetList } } = action
        return {
            data: {
                keyCabinetList
            },
            getKeyCabinetList: {
                ...state.getKeyCabinetList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.keyCabinetList.get_keyCabinetList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getKeyCabinetList: {
                ...state.getKeyCabinetList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.keyCabinetList.get_keyCabinetList_waiting]: (state, action) => {
        return {
            ...state,
            getKeyCabinetList: {
                ...state.getKeyCabinetList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.keyCabinetList.get_keyCabinetList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getKeyCabinetList: {
                ...state.getKeyCabinetList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)