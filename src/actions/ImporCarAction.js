import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const importCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userid}/carStorageRel`
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_WAITING, payload: {} })
    httpRequest
        .post(url, param.postParam, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_SUCCESS, payload: { data: res.id } })
                } else {
                    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

export const resetImportCarExecuteStatus = () => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_RESET_EXECUTE_STATUS, payload: {} })
}

export const resetImportCar = () => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_RESET, payload: {} })
}

export const changeImportCarField = (param) => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.CHANGE_IMPORTCAR_FIELD, payload: { data: param } })
}

