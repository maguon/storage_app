import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

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
    [actionTypes.carTypes.GET_CAR_LIST_LOADING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading
        }
    },
    [actionTypes.carTypes.IMPORT_CAR_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading
        }
    },
    [actionTypes.carTypes.REMOVE_CAR]: (state, action) => {
        const { payload: { data } } = action
        console.log(data)
        return {
            ...state,
            cars: state.cars.filter(item => { return item.id != data })
        }
    }
}, initialState)