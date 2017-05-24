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

export const resetImportCar = () => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_RESET, payload: {} })
}

export const changeVin = (param) => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_VIN, payload: { data: param } })
}

export const changeColor = (param) => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_COLOR, payload: { data: param } })
}

export const changeModel = (param) => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_MODEL, payload: { data: param } })
}

export const changeProDate = (param) => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_PRODATE, payload: { data: param } })
}

export const changePlanOutTime = (param) => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_PLANOUTTIME, payload: { data: param } })
}

export const chageParkingId = (param) => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_PARKINGID, payload: { data: param } })
}

export const chageRemark = (param) => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_REMARK, payload: { data: param } })
}

export const chageEngineNum = (param) => (dispatch) => {
    dispatch({ type: actionTypes.imporCarTypes.IMPORT_CAR_CHANGE_ENGINENUM, payload: { data: param } })
}

