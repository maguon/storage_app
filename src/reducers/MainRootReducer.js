import { handleActions } from 'redux-actions'
import  * as actionTypes from '../actions/actionTypes'

const initialState = {
    modalFlag : false,
    username : '',
    password: ''
}

export default handleActions({
    [actionTypes.loginTypes.LOGIN_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            username:data
        }
    },
    [actionTypes.loginTypes.LOGIN_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            password:data
        }
    }
}, initialState)

