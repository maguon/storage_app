import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCarInformation = (param) => (dispatch) => {
    let urls = [`${record_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/record`,
    `${base_host}/user/${param.requiredParam.userId}/car?carId=${param.requiredParam.carId}&active=1`]
    // console.log(urls)
    httpRequest
        .getAll(urls, (err, res) => {
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res[0].success && res[1].success) {
                    // console.log('res.success', res[1].result[0])
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
                    console.log('res.success', res[1].result[0])
                } else {
                    console.log('RES_FAITLED111', `${res[0].msg}&&${res[1].msg}`)
                }
            }
        })
}


export const exportCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/carStorageRel/${param.requiredParam.relId}/relStatus/${param.requiredParam.relStatus}`
    console.log('url', url)
    console.log('param', param)
    httpRequest
        .put(url, param.putParam, (err, res) => {
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res.success) {
                    console.log('res.success', res)
                    dispatch({ type: actionTypes.carInfoTypes.EXPORT_CAR_SUCCESS, payload: {} })
                } else {
                    console.log('RES_FAITLED', res.msg)
                }
            }
        })
}


export const appendImage = (param) => (dispatch) => {
    let url = `${file_host}user/${param.requiredParam.userId}/image?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .postFile(url, param.postFileParam, (err, res) => {
            if (err) {
                console.log('FAILED', err)
            } else {
                //console.log('res', res.success)
                if (res.success) {
                    //console.log('SUCCESS', res)
                    url = `${record_host}/car/${param.requiredParam.carId}/vin/${param.requiredParam.vin}/storageImage`
                    console.log('url', url)
                    param.postParam.url = res.imageId

                    console.log('param', param)
                    httpRequest.post(url, param.postParam, (carErr, carRes) => {
                        if (carErr) {
                            console.log('FAILED', carErr)
                        } else {
                            if (carRes.success) {
                                console.log('SUCCESS', carRes)
                                dispatch({
                                    type: actionTypes.carInfoTypes.APPEND_CAR_IMAGE_SUCCESS, payload: {
                                        data: {
                                            imageUrl: `${file_host}image/${res.imageId}`
                                        }
                                    }
                                })
                            }
                            else {
                                console.log('RES_FAITLED', carRes.msg)
                            }
                        }
                    })

                } else {
                    console.log('RES_FAITLEDimage', res.msg)
                }
            }
        })

}

export const moveCar = (param, getCarInfo) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userId}/storageParking/${param.requiredParam.parkingId}?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .put(url, {}, (err, res) => {
            if (err) {
                console.log('FAILED11111', err)
            } else {
                if (res.success) {
                    console.log('res.success', res)
                    dispatch({ type: actionTypes.carInfoTypes.MOVE_CAR_SUCCESS, payload: {} })
                    getCarInfo()
                } else {
                    console.log('RES_FAITLED33333 ', res.msg)
                }
            }
        })
}




