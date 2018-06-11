import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        keyPositionList: []
    },
    getCarKeyPositionList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.keyCabinetRowFilterList.get_carKeyPositionList_success]: (state, action) => {
        const { payload: { keyPositionList } } = action
        return {
            data: {
                keyPositionList
            },
            getCarKeyPositionList: {
                ...state.getCarKeyPositionList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.keyCabinetRowFilterList.get_carKeyPositionList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarKeyPositionList: {
                ...state.getCarKeyPositionList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.keyCabinetRowFilterList.get_carKeyPositionList_waiting]: (state, action) => {
        return {
            ...state,
            getCarKeyPositionList: {
                ...state.getCarKeyPositionList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.keyCabinetRowFilterList.get_carKeyPositionList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarKeyPositionList: {
                ...state.getCarKeyPositionList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)