import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isWaiting: false,
    recordList: [],
    storageList: [],
    isSuccess: true,
    isResult: false,
    ErrorMessage: ''
}

export default handleActions({
    [actionTypes.homeTypes.GET_HOME_DATA_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        // console.log(data)
        return {
            ...state,
            recordList: data.recordList,
            storageList: data.storageList,
            isSuccess: true,
            isWaiting: false,
            isResult: true
        }
    },
    [actionTypes.homeTypes.GET_HOME_DATA_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isSuccess: false,
            isWaiting: false,
            isResult: true,
            ErrorMessage: data.errMsg
        }
    },
    [actionTypes.homeTypes.GET_HOME_DATA_WAITING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isWaiting: true,
            isResult: false
        }
    }
}, initialState)