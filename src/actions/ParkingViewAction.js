import * as actionTypes from './actionTypes'
import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getParkingList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.parkingViewTypes.GET_PARKINGLIST_WAITING, payload: {} })
    let url = `${base_host}/storageParking?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.parkingViewTypes.GET_PARKINGLIST_ERROR, payload: { data: err } })
            }
            else {
                if (res.success) {
                    dispatch({ type: actionTypes.parkingViewTypes.GET_PARKINGLIST_SUCCESS, payload: { data: res.result } })
                }
                else {
                    dispatch({ type: actionTypes.parkingViewTypes.GET_PARKINGLIST_FAILED, payload: { data: res.msg } })
                }
            }
        })
}
