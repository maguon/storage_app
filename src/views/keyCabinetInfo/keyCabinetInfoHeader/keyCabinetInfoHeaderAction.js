import * as httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/util'

export const getCarKeyPositionCount = param => async (dispatch) => {
    try {
        const url = `${base_host}/carKeyCabinet/${param.carKeyCabinetId}/carKeyPositionCount${ObjectToUrl({ areaId: param.areaId })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.keyCabinetInfoHeader.get_carKeyPositionCountForCabinet_success, payload: { keyPositionCount: res.result[0].position_count } })
        } else {
            dispatch({ type: actionTypes.keyCabinetInfoHeader.get_carKeyPositionCountForCabinet_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
         dispatch({ type: actionTypes.keyCabinetInfoHeader.get_carKeyPositionCountForCabinet_error, payload: { errorMsg: err } })
    }
}

export const getCarKeyPositionCountWaiting = () => (dispatch) => {
     dispatch({ type: actionTypes.keyCabinetInfoHeader.get_carKeyPositionCountForCabinet_waiting, payload: {} })

}