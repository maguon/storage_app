import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/types'

const initialState = []

export default handleActions({
    [actionTypes.carTypes.GET_CARS_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return data
    }
}, initialState)