import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isWaiting: false,
    isResult: false,
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
    },
    [actionTypes.passwordTypes.CHANGE_PASSWORD_WAITING]: (state, action) => {
        return {
            ...state,
            isWaiting: true
        }
    },
    [actionTypes.passwordTypes.CHANGE_PASSWORD_FAILED]: (state, action) => {
        return {
            ...state,
            isWaiting: false,
            isResult: true,
            isSuccess: false
        }
    }, [actionTypes.passwordTypes.RESET_CHANGE_PASSWORD]: (state, action) => {
        return {
            isWaiting: false,
            isResult: false,
            isSuccess: false,
            ErrorMessage: ''
        }
    }
}, initialState)