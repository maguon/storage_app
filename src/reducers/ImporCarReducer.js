import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    importCar: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            carId: -1
        }
    }
}

// export const IMPORT_CAR_ERROR = 'IMPORT_CAR_ERROR'
// export const IMPORT_CAR_FAILED = 'IMPORT_CAR_FAILED'
// export const IMPORT_CAR_WAITING = 'IMPORT_CAR_WAITING'

export default handleActions({
    [actionTypes.imporCarTypes.IMPORT_CAR_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 0,
                isExecStatus: 2,
                data: {
                    ...state.importCar.data,
                    carId: data
                }
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_WAITING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isExecStatus: 1
            }
        }
    }
}, initialState)