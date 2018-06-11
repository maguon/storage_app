import * as httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'

export const getCarInfoOfKey = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/car${ObjectToUrl({ active: 1, carId: param.carId })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.keyInfo.get_carInfoOfKey_success, payload: { carInfo: res.result[0] } })
            
        } else {
            dispatch({ type: actionTypes.keyInfo.get_carInfoOfKey_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.keyInfo.get_carInfoOfKey_error, payload: { errorMsg: err } })
    }
}

export const getCarInfoOfKeyWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.keyInfo.get_carInfoOfKey_waiting, payload: {} })
}