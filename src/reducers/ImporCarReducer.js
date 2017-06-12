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
            carId: -1,
            vin: '',
            makeId: -1,
            makeName: '',
            modelId: -1,
            modelName: '',
            proDate: '',
            color: 'FFFFFF',
            engineNum: '',
            remark: '',
            parkingId: '',
            storageId: 0,
            storageName: '',
            planOutTime: '',
            row: '',
            column: ''
        }
    }
}


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
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_RESET_EXECUTE_STATUS]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_RESET]: (state, action) => {
        return {
            ...state,
            importCar: {
                isResultStatus: 0,
                isExecStatus: 0,
                errorMsg: '',
                failedMsg: '',
                data: {
                    carId: -1,
                    vin: '',
                    makeId: -1,
                    makeName: '',
                    modelId: -1,
                    modelName: '',
                    proDate: '',
                    color: 'FFFFFF',
                    engineNum: '',
                    remark: '',
                    parkingId: '',
                    storageId: 0,
                    storageName: '',
                    planOutTime: '',
                    row: '',
                    column: ''
                }
            }
        }
    },
    [actionTypes.imporCarTypes.CHANGE_IMPORTCAR_FIELD]: (state, action) => {
        const { payload: { data } } = action
        let param = { ...state }
        for (key in data) {
            param.importCar.data[key] = data[key]
        }
        return param
    }

}, initialState)

