import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getCarList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.carListTypes.GET_CARLIST_WAITING, payload: {} })
    let url = `${base_host}/car?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carListTypes.GET_CARLIST_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carListTypes.GET_CARLIST_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.carListTypes.GET_CARLIST_FAILED, payload: { data: res.msg } })
                }
            }

        })
}

export const getCarListMore = (param) => (dispatch) => {
    dispatch({ type: actionTypes.carListTypes.GET_CARLIST_MORE_WAITING, payload: {} })
    let url = `${base_host}/car?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carListTypes.GET_CARLIST_MORE_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carListTypes.GET_CARLIST_MORE_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.carListTypes.GET_CARLIST_MORE_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const removeCar = (carId) => (dispatch) => {
    dispatch({ type: actionTypes.carListTypes.REMOVE_CAR, payload: { data: carId } })
}

export const resetGetCarList = () => (dispatch) => {
    dispatch({ type: actionTypes.carListTypes.RESET_GET_CARLIST, payload: {} })
}

