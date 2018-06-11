import * as httpRequest from '../../../util/HttpRequest'
import { base_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/util'

export const getRecordListForCar = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${record_host}/user/${uid}/car/${param.carId}/record`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.carOpRecord.get_recordListForCar_success, payload: { recordList: res.result[0].comment } })
            dispatch({ type: actionTypes.carImage.get_imageListForCarInfo_success, payload: { imageList: res.result[0].storage_image } })
        } else {
            dispatch({ type: actionTypes.carOpRecord.get_recordListForCar_failed, payload: { failedMsg: res.msg } })
            dispatch({ type: actionTypes.carImage.get_imageListForCarInfo_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carOpRecord.get_recordListForCar_error, payload: { errorMsg: err } })
        dispatch({ type: actionTypes.carImage.get_imageListForCarInfo_error, payload: { errorMsg: err } })
    }
}

export const getRecordListForCarWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carOpRecord.get_recordListForCar_waiting, payload: {} })
    dispatch({ type: actionTypes.carImage.get_imageListForCarInfo_waiting, payload: {} })
}