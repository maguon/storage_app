import * as httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/util'

export const getAreaList = param => async (dispatch) => {
    try {
        const url = `${base_host}/storageArea${ObjectToUrl({ storageId: param.storageId })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.areaList.get_areaListForSelect_success, payload: { areaList: res.result } })
        } else {
            dispatch({ type: actionTypes.areaList.get_areaListForSelect_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.areaList.get_areaListForSelect_error, payload: { errorMsg: err } })
    }
}

export const getAreaListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.areaList.get_areaListForSelect_waiting, payload: {} })
}