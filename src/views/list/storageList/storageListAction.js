import * as httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/util'

export const getStorageList = () => async (dispatch) => {
    try {
        const url = `${base_host}/storage?storageStatus=1`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.storageList.get_storageListForSelect_success, payload: { storageList: res.result } })
        } else {
            dispatch({ type: actionTypes.storageList.get_storageListForSelect_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.storageList.get_storageListForSelect_error, payload: { errorMsg: err } })
    }
}

export const getStorageListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.storageList.get_storageListForSelect_waiting, payload: {} })
}