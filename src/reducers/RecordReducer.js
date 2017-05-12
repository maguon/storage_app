import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/types'
import {Alert} from 'react-native'

const initialState = []

export default handleActions({
    [actionTypes.recordTypes.FIRST_GET_RECORD_LIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return data
    },
    [actionTypes.recordTypes.GET_RECORD_LIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        
        return [...state, ...data]
    },
}, initialState)