import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const changePassword = (param) => (dispatch) => {
    httpRequest.post(`${base_host}/user/${param.requiredParam.userId}/password`, param.postParam, (err, res) => {
        if (err) {
            console.log('err', err)
        }
        else {
            if (res.success) {
                console.log('success', res)

                dispatch({ type: actionTypes.passwordTypes.CHANGE_PASSWORD_SUCCESS, payload: {} })
            } else {
                console.log('failed', res.msg)
            }
        }

    })
}