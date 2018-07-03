import * as httpRequest from '../../../util/HttpRequest'
import { base_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/util'

export const getRecordListForCar = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${record_host}/user/${uid}/car/${param.carId}/record`
        console.log('url', url)
        const res = await httpRequest.get(url)
        console.log('res', res)

        if (res.success) {
            dispatch({ type: actionTypes.carOpRecord.get_recordListForCar_success, payload: { recordList: res.result.length > 0 ? res.result[0].comment : [] } })
            dispatch({
                type: actionTypes.carImage.get_imageListForCarInfo_success, payload: {
                    imageList: res.result.length > 0 ? res.result[0].storage_image : [],
                    videoUrl: res.result.length > 0 && res.result[0].video[0] ? res.result[0].video[0].url : null
                }
            })
        } else {
            dispatch({ type: actionTypes.carOpRecord.get_recordListForCar_failed, payload: { failedMsg: res.msg } })
            dispatch({ type: actionTypes.carImage.get_imageListForCarInfo_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.carOpRecord.get_recordListForCar_error, payload: { errorMsg: err } })
        dispatch({ type: actionTypes.carImage.get_imageListForCarInfo_error, payload: { errorMsg: err } })
    }
}

export const getRecordListForCarWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carOpRecord.get_recordListForCar_waiting, payload: {} })
    dispatch({ type: actionTypes.carImage.get_imageListForCarInfo_waiting, payload: {} })
}