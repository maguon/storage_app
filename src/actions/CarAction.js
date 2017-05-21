import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCarList = (param, isFirst = true) => (dispatch) => {
    dispatch({ type: actionTypes.carTypes.GET_CAR_LIST_LOADING, payload: { data: { isLoading: true } } })
    let url = `${base_host}/user/${param.requiredParam.userid}/car?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res.success) {
                    if (isFirst) {
                        dispatch({
                            type: actionTypes.carTypes.FIRST_GET_CAR_LIST_SUCCESS, payload: {
                                data: {
                                    isLoading: false,
                                    cars: res.result
                                }
                            }
                        })
                    }
                    else {
                        dispatch({
                            type: actionTypes.carTypes.GET_CAR_LIST_SUCCESS, payload: {
                                data: {
                                    isLoading: false,
                                    cars: res.result
                                }
                            }
                        })
                    }
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
                console.log('FAILED', err)
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carTypes.EXPORT_CAR_SUCCESS, payload: { data: {} } })
                } else {
                    console.log('RES_FAITLED', res.msg)
                }
            }
        })
}




