import httpRequest from '../util/HttpRequest.js'
import { record_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const pushCarImage = (param) => (dispatch) => {
    let url = `${file_host}user/${param.requiredParam.userId}/image?${ObjectToUrl(param.optionalParam)}`
    dispatch({ type: actionTypes.importCarCameraTypes.IMPORT_CAR_IMAGE_WAITING, payload: {} })
    httpRequest
        .postFile(url, param.postFileParam, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    url = `${record_host}/car/${param.requiredParam.carId}/vin/${param.requiredParam.vin}/storageImage`
                    param.postParam.url = res.imageId
                    httpRequest.post(url, param.postParam, (carErr, carRes) => {
                        if (carErr) {
                            dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_ERROR, payload: { data: carErr } })
                        } else {
                            if (carRes.success) {
                                dispatch({
                                    type: actionTypes.importCarCameraTypes.IMPORT_CAR_IMAGE_SUCCESS, payload: {
                                        data: {
                                            img: `${file_host}image/${res.imageId}`,
                                            recordId: carRes.result._id
                                        }
                                    }
                                })
                            }
                            else {
                                dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_FAILED, payload: { data: carRes.msg } })
                            }
                        }
                    })
                } else {
                    dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_FAILED, payload: { data: res.msg } })
                }
            }
        })
}



export const delImage = (param) => (dispatch) => {
    let url = `${record_host}/user/${param.requiredParam.userId}/record/${param.requiredParam.recordId}/image/${param.requiredParam.url}`
    dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_WAITING, payload: {} })
    httpRequest
        .del(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_SUCCESS, payload: { data: `${file_host}image/${param.requiredParam.url}` } })
                } else {
                    dispatch({ type: actionTypes.importCarCameraTypes.DELETE_IMPORTCARIMAGE_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const resetDelImage = () => (dispatch) => {
    dispatch({ type: actionTypes.importCarCameraTypes.RESET_IMPORTCARIMAGE, payload: {} })
}
