import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        keyPositionCount: null
    },
    getCarKeyPositionCountForArea: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.keyCabinetAreaHeader.get_carKeyPositionCountForArea_success]: (state, action) => {
        const { payload: { keyPositionCount } } = action
        return {
            data: {
                keyPositionCount
            },
            getCarKeyPositionCountForArea: {
                ...state.getCarKeyPositionCountForArea,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.keyCabinetAreaHeader.get_carKeyPositionCountForArea_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarKeyPositionCountForArea: {
                ...state.getCarKeyPositionCountForArea,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.keyCabinetAreaHeader.get_carKeyPositionCountForArea_waiting]: (state, action) => {
        return {
            ...state,
            getCarKeyPositionCountForArea: {
                ...state.getCarKeyPositionCountForArea,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.keyCabinetAreaHeader.get_carKeyPositionCountForArea_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarKeyPositionCountForArea: {
                ...state.getCarKeyPositionCountForArea,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)