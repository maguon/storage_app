import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        carInfo: {}
    },
    getCarInfo: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}


//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.carInfoEditor.get_carInfoForCarInfoEditor_success]: (state, action) => {
        const { payload: { carInfo } } = action
        return {
            ...state,
            data: {
                carInfo
            },
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carInfoEditor.get_carInfoForCarInfoEditor_failed]: (state, action) => {
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
    [actionTypes.carInfoEditor.get_carInfoForCarInfoEditor_waiting]: (state, action) => {
        return {
            ...state,
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carInfoEditor.get_carInfoForCarInfoEditor_error]: (state, action) => {
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



    [actionTypes.carInfoEditor.set_carInfoForCarInfoEditor]: (state, action) => {
        const { payload: { carInfo } } = action
        return {
            ...state,
            data: {
                carInfo: { ...state.data.carInfo, ...carInfo }
            }
        }
    }
}, initialState)