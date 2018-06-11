import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        carInfo: []
    },
    getCarInfoOfKey: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.keyInfo.get_carInfoOfKey_success]: (state, action) => {
        const { payload: { carInfo } } = action
        return {
            data: {
                carInfo
            },
            getCarInfoOfKey: {
                ...state.getCarInfoOfKey,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.keyInfo.get_carInfoOfKey_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarInfoOfKey: {
                ...state.getCarInfoOfKey,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.keyInfo.get_carInfoOfKey_waiting]: (state, action) => {
        return {
            ...state,
            getCarInfoOfKey: {
                ...state.getCarInfoOfKey,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.keyInfo.get_carInfoOfKey_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarInfoOfKey: {
                ...state.getCarInfoOfKey,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)