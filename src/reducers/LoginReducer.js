import { handleActions } from 'redux-actions';
import  * as actionTypes from '../actions/actionTypes';

const initialState = {
    modalFlag : false,
    username : '',
    password: ''
}

export default handleActions({
    [actionTypes.loginTypes.LOGIN_USERNAME_CHANGE]: (state, action) => {
        const { payload: { data } } = action;
        return {
            ...state,
            username:data
        }
    },
    [actionTypes.loginTypes.LOGIN_PASSWORD_CHANGE]: (state, action) => {
        const { payload: { data } } = action;
        return {
            ...state,
            password:data
        }
    }
}, initialState)