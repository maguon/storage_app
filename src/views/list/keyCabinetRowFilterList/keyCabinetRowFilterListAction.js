import * as httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/util'

export const getCarKeyPositionList = param => async (dispatch) => {
    try {
        console.log('param', param)
        const url = `${base_host}/carKeyPosition${ObjectToUrl({ carKeyCabinetId: param.carKeyCabinetId, areaId: param.areaId })}`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.keyCabinetRowFilterList.get_carKeyPositionList_success, payload: { keyPositionList: res.result } })
        } else {
            dispatch({ type: actionTypes.keyCabinetRowFilterList.get_carKeyPositionList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.keyCabinetRowFilterList.get_carKeyPositionList_error, payload: { errorMsg: err } })
    }
}

export const getCarKeyPositionListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.keyCabinetRowFilterList.get_carKeyPositionList_waiting, payload: {} })
}