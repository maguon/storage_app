import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/types'

const initialState = []

export default handleActions({
    [actionTypes.carTypes.GET_CAR_LIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return data
    }
}, initialState)