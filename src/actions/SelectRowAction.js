/**
 * Created by lingxue on 2017/4/17.
 */
import * as actionTypes from './actionTypes'
import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const getStorageParkingList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.selectRowTypes.GET_STORAGEPARKINGS_WAITING, payload: {} })
    let url = `${base_host}/storageParking?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.selectRowTypes.GET_STORAGEPARKINGS_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.selectRowTypes.GET_STORAGEPARKINGS_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.selectRowTypes.GET_STORAGEPARKINGS_FAILED, payload: { data: res.msg } })
                }
            }
        })

}


