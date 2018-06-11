import * as httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'

export const getKeyCabinetList = () => async (dispatch) => {
    try {
        const url = `${base_host}/carKeyCabinet?keyCabinetStatus=1`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.keyCabinetList.get_keyCabinetList_success, payload: { keyCabinetList: res.result } })
        } else {
            dispatch({ type: actionTypes.keyCabinetList.get_keyCabinetList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.keyCabinetList.get_keyCabinetList_error, payload: { errorMsg: err } })
    }
}

export const getKeyCabinetListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.keyCabinetList.get_keyCabinetList_waiting, payload: {} })
}