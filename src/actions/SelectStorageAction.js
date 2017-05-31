import * as actionTypes from './actionTypes'
import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const getSelectStorageList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.selectStorageTypes.GET_SELECTSTORAGELIST_WAITING, payload: {} })
    let url = `${base_host}/storage?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.selectStorageTypes.GET_SELECTSTORAGELIST_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.selectStorageTypes.GET_SELECTSTORAGELIST_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.selectStorageTypes.GET_SELECTSTORAGELIST_FAILED, payload: { data: res.msg } })
                }
            }
        })
}
