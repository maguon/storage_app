import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        carInfo: null,
        carId: null,
        vin: null
    },
    getCarInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    updateCarKeyPosition: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    importCar: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    updatePlanOutTime: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.importForCreateCar.get_carInfoForCreateCar_success]: (state, action) => {
        const { payload: { carInfo, carId, vin } } = action
        return {
            data: {
                carInfo, carId, vin
            },
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.importForCreateCar.get_carInfoForCreateCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.importForCreateCar.get_carInfoForCreateCar_waiting]: (state, action) => {
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.importForCreateCar.get_carInfoForCreateCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.importForCreateCar.import_carForCreateCar_success]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.importForCreateCar.import_carForCreateCar_failed]: (state, action) => {
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
    [actionTypes.importForCreateCar.import_carForCreateCar_waiting]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.importForCreateCar.import_carForCreateCar_error]: (state, action) => {
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

    [actionTypes.importForCreateCar.update_planOutTimeForCreateCar_success]: (state, action) => {
        return {
            ...state,
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.importForCreateCar.update_planOutTimeForCreateCar_failed]: (state, action) => {
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
    [actionTypes.importForCreateCar.update_planOutTimeForCreateCar_waiting]: (state, action) => {
        return {
            ...state,
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.importForCreateCar.update_planOutTimeForCreateCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.importForCreateCar.update_keyPositionForCreateCar_success]: (state, action) => {
        return {
            ...state,
            updateCarKeyPosition: {
                ...state.updateCarKeyPosition,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.importForCreateCar.update_keyPositionForCreateCar_failed]: (state, action) => {
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
    [actionTypes.importForCreateCar.update_keyPositionForCreateCar_waiting]: (state, action) => {
        return {
            ...state,
            updateCarKeyPosition: {
                ...state.updateCarKeyPosition,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.importForCreateCar.update_keyPositionForCreateCar_error]: (state, action) => {
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

    [actionTypes.importForCreateCar.clean_importForCreateCar]: (state, action) => {
        return {
            ...initialState
        }
    }
}, initialState)