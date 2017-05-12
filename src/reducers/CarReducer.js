import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/types'

const initialState = []

export default handleActions({
    [actionTypes.carTypes.FIRST_GET_CAR_LIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return data
    },
    [actionTypes.carTypes.GET_CAR_LIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return [...state, ...data]
    },
    [actionTypes.carTypes.EXPORT_CAR_SUCCESS]: (state, action) => {
        return [...state]
    }
}, initialState)