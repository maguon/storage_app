import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCarInformation = (param) => (dispatch) => {
    let urls = [`${record_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/record`,
    `${base_host}/user/${param.requiredParam.userId}/car?${ObjectToUrl(param.optionalParam)}`]
    dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_WAITING, payload: {} })
    httpRequest
        .getAll(urls, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_ERROR, payload: { data: err } })
            } else {
                if (res[0].success && res[1].success) {
                    dispatch({
                        type: actionTypes.carInfoTypes.GET_CARINFO_SUCCESS, payload: {
                            data: {
                                recordList: res[0].result[0].comment,
                                imageList: res[0].result[0].storage_image.map(item => {
                                    return `${file_host}image/${item.url}`
                                }),
                                car: res[1].result[0]
                            }
                        }
                    })
                } else {
                    dispatch({ type: actionTypes.carInfoTypes.GET_CARINFO_FAILED, payload: { data: `${res[0].msg}&&${res[1].msg}` } })
                }
            }
        })
}

export const exportCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/carStorageRel/${param.requiredParam.relId}/relStatus/${param.requiredParam.relStatus}?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.carInfoTypes.EXPORT_CAR_WAITING, payload: {} })
    httpRequest
        .put(url, {}, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.EXPORT_CAR_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carInfoTypes.EXPORT_CAR_SUCCESS, payload: {} })
                } else {

                    dispatch({ type: actionTypes.carInfoTypes.EXPORT_CAR_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const appendImage = (param) => (dispatch) => {
    let url = `${file_host}user/${param.requiredParam.userId}/image?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.carInfoTypes.APPEND_CAR_IMAGE_WAITING, payload: {} })
    httpRequest
        .postFile(url, param.postFileParam, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.APPEND_CAR_IMAGE_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    url = `${record_host}/car/${param.requiredParam.carId}/vin/${param.requiredParam.vin}/storageImage`
                    param.postParam.url = res.imageId
                    httpRequest.post(url, param.postParam, (carErr, carRes) => {
                        if (carErr) {
                            dispatch({ type: actionTypes.carInfoTypes.APPEND_CAR_IMAGE_ERROR, payload: { data: carErr } })
                        } else {
                            if (carRes.success) {
                                dispatch({
                                    type: actionTypes.carInfoTypes.APPEND_CAR_IMAGE_SUCCESS, payload: {
                                        data: `${file_host}image/${res.imageId}`
                                    }
                                })
                            }
                            else {
                                dispatch({ type: actionTypes.carInfoTypes.APPEND_CAR_IMAGE_FAILED, payload: { data: carRes.msg } })
                            }
                        }
                    })
                } else {
                    dispatch({ type: actionTypes.carInfoTypes.APPEND_CAR_IMAGE_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const moveCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/storageParking/${param.requiredParam.parkingId}?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.carInfoTypes.MOVE_CAR_WAITING, payload: {} })
    httpRequest
        .put(url, {}, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carInfoTypes.MOVE_CAR_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carInfoTypes.MOVE_CAR_SUCCESS, payload: {} })
                } else {
                    dispatch({ type: actionTypes.carInfoTypes.APPEND_CAR_IMAGE_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const resetExportCar = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.RESET_EXPORT_CAR, payload: {} })
}

export const resetAppendCarImage = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.RESET_APPEND_CAR_IMAGE, payload: {} })
}
export const resetMoveCar = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.RESET_MOVE_CAR, payload: {} })
}
export const resetGetCarInfo = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoTypes.RESET_GET_CARINFO, payload: {} })
}




