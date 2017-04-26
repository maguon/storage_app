import { handleActions } from 'redux-actions'
import  * as actionTypes from '../actions/types'

const initialState = []

export default handleActions({
    [actionTypes.carTypes.CARSUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return data
        
    }
}, initialState)