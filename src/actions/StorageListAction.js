import * as actionTypes from './actionTypes'
import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const getStorageList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.storageListTypes.GET_STORAGELIST_WAITING, payload: {} })
    let url = `${base_host}/storageDate?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.storageListTypes.GET_STORAGELIST_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.storageListTypes.GET_STORAGELIST_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.storageListTypes.GET_STORAGELIST_FAILED, payload: { data: res.msg } })
                }
            }
        })
}
