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
                rel_status: 1,
                plan_out_time: ''
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
    },
    viewType: {
        isEdit: false //view=false edit=true
    },
    editCarInfo: {
        data: {
            make_id: 0,
            make_name: '',
            model_id: 0,
            model_name: '',
            pro_date: '',
            colour: '',
            engine_num: '',
            remark: '',
            plan_out_time: ''
        },
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: ''
    },
    updatePlanOutTime: {
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
        pro_date = new Date(data.car.pro_date)
        pro_date = `${pro_date.getFullYear()}-${pro_date.getMonth() + 1}-${pro_date.getDate()}`

        plan_out_time = new Date(data.car.plan_out_time)
        plan_out_time = `${plan_out_time.getFullYear()}-${plan_out_time.getMonth() + 1}-${plan_out_time.getDate()}`

        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 0,
                isExecStatus: 2,
                data: {
                    ...state.getCarInfo.data,
                    car: {
                        ...data.car,
                        pro_date: pro_date,
                        plan_out_time: plan_out_time
                    },
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
                isExecStatus: 1
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
                isExecStatus: 2,
                failedMsg: data
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
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_EXPORT_CAR]: (state, action) => {
        return {
            ...state,
            exportCar: {
                ...state.exportCar,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_APPEND_CAR_IMAGE]: (state, action) => {
        return {
            ...state,
            appendCarImage: {
                ...state.appendCarImage,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_MOVE_CAR]: (state, action) => {
        return {
            ...state,
            moveCar: {
                ...state.moveCar,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.carInfoTypes.RESET_GET_CARINFO]: (state, action) => {
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.carInfoTypes.CHANGE_VIEWTYPE]: (state, action) => {
        const { payload: { data } } = action
        let editCarInfo = data ? {
            ...state.editCarInfo,
            data: state.getCarInfo.data.car,
            isExecStatus: 0
        } : {
                ...state.editCarInfo,
                isExecStatus: 0
            }

        return {
            ...state,
            viewType: {
                ...state.viewType,
                isEdit: data
            },
            editCarInfo: editCarInfo,
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        const { vin, makeId, makeName, modelId, modelName, proDate, colour, engineNum, remark } = data
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                data: {
                    ...state.getCarInfo.data,
                    car: {
                        ...state.getCarInfo.data.car,
                        vin: vin,
                        make_id: makeId,
                        make_name: makeName,
                        model_id: modelId,
                        model_name: modelName,
                        pro_date: proDate,
                        colour: colour,
                        engine_num: engineNum,
                        remark: remark
                    }
                }
            },
            editCarInfo: {
                ...state.editCarInfo,
                isExecStatus: 2,
                isResultStatus: 0
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            editCarInfo: {
                ...state.editCarInfo,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_WAITING]: (state, action) => {
        return {
            ...state,
            editCarInfo: {
                ...state.editCarInfo,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            editCarInfo: {
                ...state.editCarInfo,
                isExecStatus: 2,
                isResultStatus: 1,
                failedMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.CHANGE_EDITCARINFRO_MODEL]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            editCarInfo: {
                ...state.editCarInfo,
                data: {
                    ...state.editCarInfo.data,
                    make_id: data.makeId,
                    make_name: data.makeName,
                    model_id: data.modelId,
                    model_name: data.modelName
                }
            }
        }
    },
    [actionTypes.carInfoTypes.CHANGE_EDITCARINFRO_REMARK]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            editCarInfo: {
                ...state.editCarInfo,
                data: {
                    ...state.editCarInfo.data,
                    remark: data
                }
            }
        }
    },
    [actionTypes.carInfoTypes.CHANGE_EDITCARINFRO_PRODATE]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            editCarInfo: {
                ...state.editCarInfo,
                data: {
                    ...state.editCarInfo.data,
                    pro_date: data
                }
            }
        }
    },
    [actionTypes.carInfoTypes.CHANGE_EDITCARINFRO_PLANOUTIME]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            editCarInfo: {
                ...state.editCarInfo,
                data: {
                    ...state.editCarInfo.data,
                    plan_out_time: data
                }
            }
        }
    },
    [actionTypes.carInfoTypes.CHANGE_EDITCARINFRO_COLOR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            editCarInfo: {
                ...state.editCarInfo,
                data: {
                    ...state.editCarInfo.data,
                    colour: data
                }
            }
        }
    },
    [actionTypes.carInfoTypes.CHANGE_EDITCARINFRO_ENGINENUM]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            editCarInfo: {
                ...state.editCarInfo,
                data: {
                    ...state.editCarInfo.data,
                    engine_num: data
                }
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_PLANOUTTIME_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        const { planOutTime } = data
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                data: {
                    ...state.getCarInfo.data,
                    car: {
                        ...state.getCarInfo.data.car,
                        plan_out_time: planOutTime
                    }
                }
            },
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isExecStatus: 2,
                isResultStatus: 0
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_PLANOUTTIME_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_PLANOUTTIME_WAITING]: (state, action) => {
        return {
            ...state,
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carInfoTypes.UPDATE_CARINFO_PLANOUTTIME_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            updatePlanOutTime: {
                ...state.updatePlanOutTime,
                isExecStatus: 2,
                isResultStatus: 1,
                failedMsg: data
            }
        }
    }
}, initialState)

