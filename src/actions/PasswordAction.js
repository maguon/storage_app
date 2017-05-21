import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const changePassword = (param) => (dispatch) => {

    httpRequest.put(`${base_host}/user/${param.requiredParam.userId}/password`, param.putParam, (err, res) => {
        console.log(param.putParam)
        if (err) {
            console.log('err', err)
        }
        else {
            if (res.success) {
                console.log('success', res)

                dispatch({ type: actionTypes.passwordTypes.CHANGE_PASSWORD_SUCCESS, payload: {} })
            } else {
                dispatch({ type: actionTypes.passwordTypes.CHANGE_PASSWORD_FAILED, payload: {} })
                console.log('failed', res)
            }
        }

    })
}


export const resetPassword = () => (dispatch) => {
    dispatch({ type: actionTypes.passwordTypes.RESET_CHANGE_PASSWORD, payload: {} })
}