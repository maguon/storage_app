import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

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
    [(actionTypes.makePDF.get_carInfoForMakePdf_success)]: (state, action) => {
        const { payload: { carInfo } } = action
        return {
            ...state,
            data:{
                carInfo
            },
            getCarInfo: {
                ...state.getCarInfo,
                isResultStatus: 2
            }
        }
    },
    [(actionTypes.makePDF.get_carInfoForMakePdf_failed)]: (state, action) => {
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
    [(actionTypes.makePDF.get_carInfoForMakePdf_error)]: (state, action) => {
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
    [(actionTypes.makePDF.get_carInfoForMakePdf_waiting)]: (state, action) => {
        return {
            ...initialState,
            getCarInfo: {
                ...initialState.getCarInfo,
                isResultStatus: 1
            }
        }
    },
}, initialState)