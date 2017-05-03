import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/types'

const initialState = []


export default handleActions({
    [actionTypes.carMakeTypes.CAR_MAKES_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return data
    }
}, initialState)