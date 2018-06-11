import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        keyPositionCount: null
    },
    getKeyPositionCount: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.keyCabinetInfoHeader.get_carKeyPositionCountForCabinet_success]: (state, action) => {
        const { payload: { keyPositionCount } } = action
        return {
            data: {
                keyPositionCount
            },
            getKeyPositionCount: {
                ...state.getKeyPositionCount,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.keyCabinetInfoHeader.get_carKeyPositionCountForCabinet_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getKeyPositionCount: {
                ...state.getKeyPositionCount,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.keyCabinetInfoHeader.get_carKeyPositionCountForCabinet_waiting]: (state, action) => {
        return {
            ...state,
            getKeyPositionCount: {
                ...state.getKeyPositionCount,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.keyCabinetInfoHeader.get_carKeyPositionCountForCabinet_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getKeyPositionCount: {
                ...state.getKeyPositionCount,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)