import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        keyCabinetAreaList: []
    },
    getKeyCabinetAreaList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.keyCabinetArea.get_keyCabinetAreaList_success]: (state, action) => {
        const { payload: { keyCabinetAreaList } } = action
        return {
            data: {
                keyCabinetAreaList
            },
            getKeyCabinetAreaList: {
                ...state.getKeyCabinetAreaList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.keyCabinetArea.get_keyCabinetAreaList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getKeyCabinetAreaList: {
                ...state.getKeyCabinetAreaList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.keyCabinetArea.get_keyCabinetAreaList_waiting]: (state, action) => {
        return {
            ...state,
            getKeyCabinetAreaList: {
                ...state.getKeyCabinetAreaList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.keyCabinetArea.get_keyCabinetAreaList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getKeyCabinetAreaList: {
                ...state.getKeyCabinetAreaList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)