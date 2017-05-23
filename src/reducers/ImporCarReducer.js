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
    [actionTypes.imporCarTypes.IMPORT_CAR_RESET]: (state, action) => {
        return {
            ...state,
            importCar: {
                ...state.importCar,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_VIN]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                data: {
                    ...state.importCar.data,
                    vin: data
                }
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_COLOR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                data: {
                    ...state.importCar.data,
                    color: data
                }
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_MODEL]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                data: {
                    ...state.importCar.data,
                    makeId: data.makeId,
                    makeName: data.makeName,
                    modelId: data.modelId,
                    modelName: data.modelName
                }
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_PRODATE]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                data: {
                    ...state.importCar.data,
                    proDate: data
                }
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_PLANOUTTIME]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                data: {
                    ...state.importCar.data,
                    planOutTime: data
                }
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_REMARK]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                data: {
                    ...state.importCar.data,
                    remark: data
                }
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_PARKINGID]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                data: {
                    ...state.importCar.data,
                    row: data.row,
                    column: data.column,
                    storageName: data.storageName,
                    storageId: data.storageId,
                    parkingId: data.parkingId
                }
            }
        }
    },
    [actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_ENGINENUM]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            importCar: {
                ...state.importCar,
                data: {
                    ...state.importCar.data,
                    engineNum: data
                }
            }
        }
    }
}, initialState)

