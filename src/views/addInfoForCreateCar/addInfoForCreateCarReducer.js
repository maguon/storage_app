import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        carId: 0,
        status: 0,
        vin: ''
    },
    createCar: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    },
    modifyCar: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: '',
    }
}

export default handleActions({
    [actionTypes.addInfoForCreateCar.add_infoForCreateCar_success]: (state, action) => {
        const { payload: { carId, vin } } = action
        return {
            ...state,
            data: {
                carId,
                vin,
                status: 1
            },
            createCar: {
                ...initialState.createCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addInfoForCreateCar.add_infoForCreateCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            addCar: {
                ...initialState.addCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.addInfoForCreateCar.add_infoForCreateCar_waiting]: (state, action) => {
        return {
            ...state,
            addCar: {
                ...initialState.addCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addInfoForCreateCar.add_infoForCreateCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            addCar: {
                ...initialState.addCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },


    [actionTypes.addInfoForCreateCar.modify_infoForCreateCar_success]: (state, action) => {
        return {
            ...state,
            modifyCar: {
                ...initialState.modifyCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.addInfoForCreateCar.modify_infoForCreateCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            modifyCar: {
                ...initialState.modifyCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.addInfoForCreateCar.modify_infoForCreateCar_waiting]: (state, action) => {
        return {
            ...state,
            modifyCar: {
                ...initialState.modifyCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.addInfoForCreateCar.modify_infoForCreateCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            modifyCar: {
                ...initialState.modifyCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.addInfoForCreateCar.clean_infoForCreateCar]: (state, action) => {
        return {
            ...initialState
        }
    },


    [actionTypes.addInfoForCreateCar.change_createCarStatus]: (state, action) => {
        const { payload: { carId, status, vin } } = action
        return {
            ...initialState,
            data: {
                carId, status, vin
            }
        }
    }
}, initialState)
