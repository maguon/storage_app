import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getRecordsForHome = (param) => (dispatch) => {
    let url = `${record_host}/opRecord?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_WAITING, payload: {} })
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.homeTypes.GET_RECORDS_HOME_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const getStoragesForHome = (param) => (dispatch) => {
    let url = `${base_host}/storageDate?${ObjectToUrl(param.OptionalParam)}`
    dispatch({ type: actionTypes.homeTypes.GET_STORAGES_HOME_WAITING, payload: {} })
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.homeTypes.GET_STORAGES_HOME_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.homeTypes.GET_STORAGES_HOME_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.homeTypes.GET_STORAGES_HOME_FAILED, payload: { data: res.msg } })
                }
            }
        })
}


export const resetStoragesForHome = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.RESET_GET_STORAGES_HOME, payload: {} })
}

export const resetRecordsForHome = () => (dispatch) => {
    dispatch({ type: actionTypes.homeTypes.RESET_GET_RECORDS_HOME, payload: {} })
}



