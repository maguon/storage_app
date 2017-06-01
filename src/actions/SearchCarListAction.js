import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const SEARCH_CARLIST_SUCCESS = 'SEARCH_CARLIST_SUCCESS'
export const SEARCH_CARLIST_FAILED = 'SEARCH_CARLIST_FAILED'
export const SEARCH_CARLIST_WAITING = 'SEARCH_CARLIST_WAITING'
export const SEARCH_CARLIST_ERROR = 'SEARCH_CARLIST_ERROR'
export const RESET_SEARCH_CARLIST = 'RESET_SEARCH_CARLIST'

export const SEARCH_CARLIST_MORE_SUCCESS = 'SEARCH_CARLIST_MORE_SUCCESS'
export const SEARCH_CARLIST_MORE_FAILED = 'SEARCH_CARLIST_MORE_FAILED'
export const SEARCH_CARLIST_MORE_WAITING = 'SEARCH_CARLIST_MORE_WAITING'
export const SEARCH_CARLIST_MORE_ERROR = 'SEARCH_CARLIST_MORE_ERROR'

export const REMOVE_SEARCH_CAR = 'REMOVE_SEARCH_CAR'

export const searchCarList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.searchCarListTypes.SEARCH_CARLIST_WAITING, payload: {} })
    let url = `${base_host}/user/${param.requiredParam.userid}/car?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.searchCarListTypes.SEARCH_CARLIST_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.searchCarListTypes.SEARCH_CARLIST_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.searchCarListTypes.SEARCH_CARLIST_FAILED, payload: { data: res.msg } })
                }
            }

        })
}

export const searchCarListMore = (param) => (dispatch) => {
    dispatch({ type: actionTypes.searchCarListTypes.SEARCH_CARLIST_MORE_WAITING, payload: {} })
    let url = `${base_host}/user/${param.requiredParam.userid}/car?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.searchCarListTypes.SEARCH_CARLIST_MORE_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.searchCarListTypes.SEARCH_CARLIST_MORE_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.searchCarListTypes.SEARCH_CARLIST_MORE_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const removeSearchCar = (carId) => (dispatch) => {
    dispatch({ type: actionTypes.searchCarListTypes.REMOVE_SEARCH_CAR, payload: { data: carId } })
}

export const resetSearchCarList = () => (dispatch) => {
    dispatch({ type: actionTypes.searchCarListTypes.RESET_SEARCH_CARLIST, payload: {} })
}

