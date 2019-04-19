import * as httpRequest from '../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'

export const getCarInfo = req => async (dispatch, getState) => {
    try {
        console.log('req', req)
        const { loginReducer: { data: { user: { uid } } } } = getState()
        console.log(' getState()', getState())
        // console.log('user', user)
        const url = `${base_host}/user/${uid}/car?carId=${req.carId}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.makePDF.get_carInfoForMakePdf_success, payload: { carInfo: res.result[0] ? res.result[0] : {} } })
        } else {
            dispatch({ type: actionTypes.makePDF.get_carInfoForMakePdf_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.makePDF.get_carInfoForMakePdf_error, payload: { errorMsg: `${err}` } })
    }
}

export const getCarInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.makePDF.get_carInfoForMakePdf_waiting, payload: {} })
}