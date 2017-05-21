import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isWaiting: false,
    recordList: [],
    imageList: [],
    isResult: false,
    isSuccess: true,
    ErrorMessage: ''
}

export default handleActions({
    [actionTypes.carInfoTypes.GET_CARINFO_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isWaiting: false,
            recordList: data.recordList,
            imageList: data.imageList,
            isResult: true,
            isSuccess: true,
        }
    },
    [actionTypes.carInfoTypes.GET_CARINFO_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isWaiting: false,
            isResult: true,
            isSuccess: false,
            ErrorMessage: data.errMsg
        }
    },
    [actionTypes.carInfoTypes.GET_CARINFO_WAITING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isWaiting: true,
            recordList: data.recordList,
            imageList: data.imageList,
            isResult: false,
        }
    },
    [actionTypes.carInfoTypes.EXPORT_CAR_SUCCESS]: (state, action) => {
        return {
            ...state,
            isWaiting: false,
            isResult: true,
            isSuccess: true
        }
    }
}, initialState)