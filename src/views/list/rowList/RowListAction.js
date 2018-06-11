import * as httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/util'

export const getParkingList = param => async (dispatch) => {
    try {
        const url = `${base_host}/storageParking${ObjectToUrl({ storageId: param.storageId, areaId: param.areaId })}`
        console.log('url',url)
        const res = await httpRequest.get(url)
        console.log('res',res)
        
        if (res.success) {
            dispatch({ type: actionTypes.rowList.get_parkingListForSelect_success, payload: { parkingList: res.result } })
        } else {
            dispatch({ type: actionTypes.rowList.get_parkingListForSelect_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.rowList.get_parkingListForSelect_error, payload: { errorMsg: err } })
    }
}

export const getParkingListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.rowList.get_parkingListForSelect_waiting, payload: {} })
}