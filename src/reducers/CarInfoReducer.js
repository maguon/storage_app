import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    getCarInfo: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            recordList: [],
            imageList: [],
            car: {
                make_name: '',
                model_name: '',
                colour: 'ffffff',
                vin: '',
                engine_num: '',
                row: 0,
                col: 0,
                storage_name: '',
                storage_id: '',
                pro_date: '',
                rel_status: 1
            }
        }
    },
    exportCar: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    moveCar: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    appendCarImage: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }

}

export default handleActions({
    [actionTypes.carInfoTypes.APPEND_CAR_IMAGE_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                data: {
                    ...state.getCarInfo.data,
                    imageList: [...state.getCarInfo.data.imageList, data]
                }
            },
            appendCarImage: {
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.APPEND_CAR_IMAGE_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            appendCarImage: {
                ...state.appendCarImage,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.APPEND_CAR_IMAGE_WAITING]: (state, action) => {
        return {
            ...state,
            appendCarImage: {
                ...state.appendCarImage,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.APPEND_CAR_IMAGE_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            appendCarImage: {
                ...state.appendCarImage,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CARINFO_SUCCESS]: (state, action) => {
        const { payload: { data } } = action

        // console.log(data)
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 0,
                isExecStatus: 2,
                data: {
                    ...state.getCarInfo.data,
                    car: data.car,
                    recordList: data.recordList,
                    imageList: data.imageList
                }
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CARINFO_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CARINFO_WAITING]: (state, action) => {
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.GET_CARINFO_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.MOVE_CAR_SUCCESS]: (state, action) => {
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.MOVE_CAR_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.MOVE_CAR_WAITING]: (state, action) => {
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
                isExecStatus: 11
            }
        }
    },
    [actionTypes.carInfoTypes.MOVE_CAR_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.EXPORT_CAR_SUCCESS]: (state, action) => {
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                data: {
                    ...state.getCarInfo.data,
                    car: {
                        ...state.getCarInfo.data.car,
                        rel_status: 0
                    }
                }
            },
            exportCar: {
                ...state.exportCar,
                isResultStatus: 0,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.EXPORT_CAR_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isResultStatus: 2,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.EXPORT_CAR_WAITING]: (state, action) => {
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.EXPORT_CAR_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isResultStatus: 1,
                isExecStatus: 2
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_EXPORT_CAR]: (state, action) => {
        let tt={
            ...state,
            exportCar: {
                ...state.exportCar,
                isExecStatus: 0
            }
        }
        console.log(tt)
        return tt
    }
}, initialState)



