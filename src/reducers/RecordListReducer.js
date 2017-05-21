import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isWaiting: false,
    recordList: [],
    isSuccess: false,
    ErrorMessage: ''
}

export default handleActions({
    [actionTypes.passwordTypes.CHANGE_PASSWORD_SUCCESS]: (state, action) => {
        return {
            ...state,
            isWaiting: false,
            isResult: true,
            isSuccess: true
        }
    }
}, initialState)