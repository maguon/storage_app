import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/types'

const initialState = {
    isLoading: false,
    records: [],
    isError: false,
    ErrorMessage: {}
}

export default handleActions({
    [actionTypes.recordTypes.FIRST_GET_RECORD_LIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading,
            records: data.records
        }
    },
    [actionTypes.recordTypes.GET_RECORD_LIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading,
            records: [...state.records, ...data.records]
        }
    },
    [actionTypes.recordTypes.GET_RECORD_LIST_LOADING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading
        }
    }
}, initialState)