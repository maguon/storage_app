import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    carModels: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            carModelList: []
        }
    }
}

export default handleActions({
    [actionTypes.carModelTypes.GET_CARMODELS_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            carModels: {
                ...state.carModels,
                isResultStatus: 0,
                isExecStatus: 2,
                data: {
                    carModelList: data
                }
            }
        }
    },
    [actionTypes.carModelTypes.GET_CARMODELS_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            carModels: {
                ...state.carModels,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carModelTypes.GET_CARMODELS_WAITING]: (state, action) => {
        return {
            carModels: {
                ...state.carModels,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carModelTypes.GET_CARMODELS_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            carModels: {
                ...state.carModels,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    }
}, initialState)