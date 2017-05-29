import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    carMakes: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            carMakeList: []
        }
    }
}

export default handleActions({
    [actionTypes.carMakeTypes.GET_CARMAKES_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            carMakes: {
                ...state.carMakes,
                isExecStatus: 2,
                isResultStatus: 0,
                data: {
                    carMakeList: data
                }
            }
        }
    },
    [actionTypes.carMakeTypes.GET_CARMAKES_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            carMakes: {
                ...state.carMakes,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carMakeTypes.GET_CARMAKES_WAITING]: (state, action) => {
        return {
            carMakes: {
                ...state.carMakes,
                isExecuteStatus: 1
            }
        }
    },
    [actionTypes.carMakeTypes.GET_CARMAKES_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            carMakes: {
                ...state.carMakes,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    }
}, initialState)

