import * as httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'

export const getKeyList = param => async (dispatch) => {
    try {
        const url = `${base_host}/carKeyPosition${ObjectToUrl({ carKeyCabinetId: param.carKeyCabinetId, areaId: param.areaId })}`
        // console.log('url',url)
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.keyCabinetInfo.get_keyList_success, payload: { keyList: res.result } })
        } else {
            dispatch({ type: actionTypes.keyCabinetInfo.get_keyList_failed, payload: { failedMsg: res, msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.keyCabinetInfo.get_keyList_error, payload: { errorMsg: err } })
    }
}

export const getKeyListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.keyCabinetInfo.get_keyList_waiting, payload: {} })
}