import { handleActions } from 'redux-actions'
import  * as actionTypes from '../actions/types'

const initialState = []

export default handleActions({
    [actionTypes.recordTypes.GET_RECORDS_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return data     
    }
}, initialState)