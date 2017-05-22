import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {

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
        pro_date: ''
    },
    isWaiting: false,
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
            car: data.car,
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
    },
    [actionTypes.carInfoTypes.MOVE_CAR_SUCCESS]: (state, action) => {
        return {
            ...state,
            isWaiting: false,
            isResult: true,
            isSuccess: true
        }
    },
    [actionTypes.carInfoTypes.APPEND_CAR_IMAGE_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            imageList: [...state.imageList, data.imageUrl],
            isWaiting: false,
            isResult: true,
            isSuccess: true
        }
    },
}, initialState)