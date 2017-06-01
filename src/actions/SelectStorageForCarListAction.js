import * as actionTypes from './actionTypes'
import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const getSelectStorageListForCarList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.selectStorageForCarListTypes.GET_SELECTSTORAGELISTFORCARLIST_WAITING, payload: {} })
    let url = `${base_host}/storage?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.selectStorageForCarListTypes.GET_SELECTSTORAGELISTFORCARLIST_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.selectStorageForCarListTypes.GET_SELECTSTORAGELISTFORCARLIST_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.selectStorageForCarListTypes.GET_SELECTSTORAGELISTFORCARLIST_FAILED, payload: { data: res.msg } })
                }
            }
        })
}


export const selectStorageListForCarList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.selectStorageForCarListTypes.SELECT_STORAGELISTFORCARLIST, payload: { data: param } })
}

export const resetSelectStorageListForCarList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.selectStorageForCarListTypes.RESET_SELECTSTORAGELISTFORCARLIST, payload: { } })
}
