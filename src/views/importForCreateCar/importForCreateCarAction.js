import * as httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'

export const getCarInfoForCreateCar = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.importForCreateCar.get_carInfoForCreateCar_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/car${ObjectToUrl({ carId: param.carId, active: 1 })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.importForCreateCar.get_carInfoForCreateCar_success, payload: { carInfo: res.result[0] ? res.result[0] : null, carId: param.carId, vin: param.vin } })
        } else {
            dispatch({ type: actionTypes.importForCreateCar.get_carInfoForCreateCar_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.importForCreateCar.get_carInfoForCreateCar_error, payload: { errorMsg: err } })
    }
}


export const updateCarKeyPosition = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.importForCreateCar.update_keyPositionForCreateCar_waiting, payload: {} })
        const { carPosition: { id } } = param
        const { loginReducer: { data: { user: { uid } } }, importForCreateCarReducer: { data: { carId } } } = getState()
        const url = `${base_host}/user/${uid}/carKeyPosition/${id}`
        const res = await httpRequest.put(url, { carId })
        if (res.success) {
            dispatch({ type: actionTypes.importForCreateCar.update_keyPositionForCreateCar_success, payload: {} })
            dispatch(getCarInfoForCreateCar({ carId }))
        } else {
            dispatch({ type: actionTypes.importForCreateCar.update_keyPositionForCreateCar_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.importForCreateCar.update_keyPositionForCreateCar_error, payload: { errorMsg: err } })
    }
}

export const importCar = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.importForCreateCar.import_carForCreateCar_waiting, payload: {} })
        const { parkingId, storageId, storageName, row, col, lot, areaId, areaName } = param
        const { loginReducer: { data: { user: { uid } } }, importForCreateCarReducer: { data: { carId, vin } } } = getState()
        const url = `${base_host}/user/${uid}/car/${carId}/vin/${vin}/carStorageRel`
        const res = await httpRequest.put(url, {
            parkingId, storageId, storageName
        })
        if (res.success) {
            dispatch({ type: actionTypes.importForCreateCar.import_carForCreateCar_success, payload: {} })
            dispatch(getCarInfoForCreateCar({ carId }))
        } else {
            dispatch({ type: actionTypes.importForCreateCar.import_carForCreateCar_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.importForCreateCar.import_carForCreateCar_error, payload: { errorMsg: err } })
    }
}


export const updatePlanOutTime = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.importForCreateCar.update_planOutTimeForCreateCar_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } }, importForCreateCarReducer: { data: { carInfo: { r_id }, carId } } } = getState()
        const url = `${base_host}/user/${uid}/carStorageRel/${r_id}/planOutTime`
        const res = await httpRequest.put(url, {
            planOutTime: param.planOutTime
        })
        if (res.success) {
            dispatch({ type: actionTypes.importForCreateCar.update_planOutTimeForCreateCar_success, payload: {} })
            dispatch(getCarInfoForCreateCar({ carId }))
            
        } else {
            dispatch({ type: actionTypes.importForCreateCar.update_planOutTimeForCreateCar_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.importForCreateCar.update_planOutTimeForCreateCar_error, payload: { errorMsg: err } })
    }
}