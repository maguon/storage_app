import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCarInformation = (param) => (dispatch) => {
    let url = `${record_host}/user/${param.requiredParam.userId}/car/${param.requiredParam.carId}/record`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res.success) {
                    console.log('res.success', res.result[0])
                    dispatch({
                        type: actionTypes.carInfoTypes.GET_CARINFO_SUCCESS, payload: {
                            data: {
                                recordList: res.result[0].comment,
                                imageList: res.result[0].storage_image.map(item => {
                                    return `${file_host}image/${item.url}`
                                })
                            }
                        }
                    })
                } else {
                    console.log('RES_FAITLED', res.msg)
                }
            }
        })
}


export const exportCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userid}/carStorageRel/${param.requiredParam.relId}/relStatus/${param.requiredParam.relStatus}`
    httpRequest
        .put(url, param.putParam, (err, res) => {
            if (err) {
                console.log('FAILED11111', err)
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

}

export const moveCar = (param) => (dispatch) => {

}




