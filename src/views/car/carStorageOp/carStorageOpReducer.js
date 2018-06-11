import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    updateCarPosition: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    updateCarKeyPosition: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    exportCar:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    importCar:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    updatePlanOutTime:{
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '' 
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.carStorageOp.update_carPosition_success]: (state, action) => {
        return {
            ...state,
            updateCarPosition: {
                ...state.updateCarPosition,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carStorageOp.update_carPosition_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updateCarPosition: {
                ...state.updateCarPosition,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carStorageOp.update_carPosition_waiting]: (state, action) => {
        return {
            ...state,
            updateCarPosition: {
                ...state.updateCarPosition,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carStorageOp.update_carPosition_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updateCarPosition: {
                ...state.updateCarPosition,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.carStorageOp.update_carKeyPosition_success]: (state, action) => {
        return {
            ...state,
            updateCarKeyPosition: {
                ...state.updateCarKeyPosition,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carStorageOp.update_carKeyPosition_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updateCarKeyPosition: {
                ...state.updateCarKeyPosition,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carStorageOp.update_carKeyPosition_waiting]: (state, action) => {
        return {
            ...state,
            updateCarKeyPosition: {
                ...state.updateCarKeyPosition,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carStorageOp.update_carKeyPosition_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updateCarKeyPosition: {
                ...state.updateCarKeyPosition,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.carStorageOp.export_car_success]: (state, action) => {
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carStorageOp.export_car_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carStorageOp.export_car_waiting]: (state, action) => {
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carStorageOp.export_car_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.carStorageOp.import_car_success]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carStorageOp.import_car_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carStorageOp.import_car_waiting]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carStorageOp.import_car_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.carStorageOp.update_planOutTime_success]: (state, action) => {
        return {
            ...state,
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carStorageOp.update_planOutTime_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carStorageOp.update_planOutTime_waiting]: (state, action) => {
        return {
            ...state,
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carStorageOp.update_planOutTime_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)