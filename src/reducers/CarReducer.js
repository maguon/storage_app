import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/types'

const initialState = {
    isLoading: false,
    cars: [],
    isError: false,
    ErrorMessage: {}
}

export default handleActions({
    [actionTypes.carTypes.FIRST_GET_CAR_LIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading,
            cars: data.cars
        }
    },
    [actionTypes.carTypes.GET_CAR_LIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading,
            cars: [...state.cars, ...data.cars]
        }
    },
    [actionTypes.carTypes.EXPORT_CAR_SUCCESS]: (state, action) => {
        return {
            ...state,
            isLoading: data.isLoading
        }
    },
    [actionTypes.carTypes.LOADING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading
        }
    }
}, initialState)