import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host } from '../config/Host'
import * as actionTypes from '../actions/types'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCarList = (param, isFirst = true) => (dispatch) => {
    console.log('=======START======')
    let url = `${base_host}/user/${param.requiredParam.userid}/car?${ObjectToUrl(param.optionalParam)}`
    console.log(url)
    httpRequest
        .get(url, (err, res) => {
            console.log('ttt')
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res.success) {
                    console.log('SECCUSS', res.result)
                    if (isFirst)
                        dispatch({ type: actionTypes.carTypes.FIRST_GET_CAR_LIST_SUCCESS, payload: { data: res.result } })
                    else
                        dispatch({ type: actionTypes.carTypes.GET_CAR_LIST_SUCCESS, payload: { data: res.result } })
                } else {
                    console.log('RES_FAITLED', res.msg)
                }
            }
        })
    console.log('=======END======')
}


export const exportCar = (param) => (dispatch) => {
    console.log('=======START======')
    let url = `${base_host}/user/${param.requiredParam.userid}/carStorageRel/${param.requiredParam.relId}/relStatus/${param.requiredParam.relStatus}`
    console.log(url)
    httpRequest
        .put(url,param.putParam, (err, res) => {
            console.log('ttt')
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res.success) {
                    console.log('SECCUSS', res.result)
                    dispatch({ type: actionTypes.carTypes.EXPORT_CAR_SUCCESS, payload: { data: {} } })
                } else {
                    console.log('RES_FAITLED', res.msg)
                }
            }
        })
    console.log('=======END======')
}

export const getCarById = (carId) => (dispatch) => {
    dispatch({ type: actionTypes.carTypes.GET_CAR_LIST_SUCCESS, payload: { data: carId } })
}