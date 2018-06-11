import * as httpRequest from '../../../util/HttpRequest'
import { base_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/util'
import * as actions from '../../../actions'
import { change } from 'redux-form'
import moment from 'moment'

export const updateCarPosition = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.carStorageOp.update_carPosition_waiting, payload: {} })
        const { parking: { id, row, col, lot, area_id, area_name }, carId } = param
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/storageParking/${id}${ObjectToUrl({ carId })}`
        const res = await httpRequest.put(url, {})
        if (res.success) {
            dispatch({ type: actionTypes.carStorageOp.update_carPosition_success, payload: {} })
            dispatch(actions.carOpRecord.getRecordListForCarWaiting())
            dispatch(actions.carOpRecord.getRecordListForCar({ carId }))
            dispatch(change('carStorageOpForm', 'position', { id, value: `${row}排 ${col}列 ${lot}单元格` }))
            dispatch({ type: actionTypes.carList.set_carInfoForCarList, payload: { carInfo: { id: carId, row, col, lot, p_id: id, area_id, area_name } } })
        } else {
            dispatch({ type: actionTypes.carStorageOp.update_carPosition_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carStorageOp.update_carPosition_error, payload: { errorMsg: err } })
    }
}

export const updateCarKeyPosition = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.carStorageOp.update_carKeyPosition_waiting, payload: {} })
        const { carPosition: { id, area_name, row, col }, carId } = param
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/carKeyPosition/${id}`
        const res = await httpRequest.put(url, { carId })
        if (res.success) {
            dispatch({ type: actionTypes.carStorageOp.update_carKeyPosition_success, payload: {} })
            dispatch(actions.carOpRecord.getRecordListForCarWaiting())
            dispatch(actions.carOpRecord.getRecordListForCar({ carId }))
            dispatch(change('carStorageOpForm', 'keyCabinetPosition', { id, value: `${area_name}扇区 ${row}排 ${col}号` }))
        } else {
            dispatch({ type: actionTypes.carStorageOp.update_carKeyPosition_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carStorageOp.update_carKeyPosition_error, payload: { errorMsg: err } })
    }
}


export const exportCar = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.carStorageOp.export_car_waiting, payload: {} })
        const { relId, parkingId, storageId, carId } = param
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/carStorageRel/${relId}/relStatus/2${ObjectToUrl({ parkingId, storageId, carId })}`
        console.log('url', url)
        const res = await httpRequest.put(url, {})
        console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.carStorageOp.export_car_success, payload: {} })
            dispatch({
                type: actionTypes.carList.set_carInfoForCarList, payload: {
                    carInfo: {
                        id: carId,
                        area_name: null,
                        area_id: null,
                        car_key_cabinet_area: null,
                        car_key_position_col: null,
                        car_key_position_id: null,
                        car_key_position_row: null,
                        key_cabinet_id: null,
                        key_cabinet_name: null,
                        col: null,
                        p_id: null,
                        row: null,
                        lot: null,
                        storage_id: null,
                        storage_name: null,
                        rel_status: 2,
                        parking_status: null,
                        real_out_time: moment().format()
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.carStorageOp.export_car_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        console.log('err', err)
        dispatch({ type: actionTypes.carStorageOp.export_car_error, payload: { errorMsg: err } })
    }
}

export const importCar = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.carStorageOp.import_car_waiting, payload: {} })
        const { vin, carId, parkingId, storageId, storageName, row, col, lot, areaId, areaName } = param
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/car/${carId}/vin/${vin}/carStorageRel`
        const res = await httpRequest.put(url, {
            parkingId, storageId, storageName
        })
        if (res.success) {
            dispatch({ type: actionTypes.carStorageOp.import_car_success, payload: {} })
            dispatch(actions.carOpRecord.getRecordListForCarWaiting())
            dispatch(actions.carOpRecord.getRecordListForCar({ carId }))
            dispatch({
                type: actionTypes.carList.set_carInfoForCarList, payload: {
                    carInfo: {
                        id: carId,
                        rel_status: 1,
                        row,
                        col,
                        lot,
                        storage_id: storageId,
                        storage_name: storageName,
                        enter_time: moment().format(),
                        real_out_time: null,
                        r_id: res.result.relId,
                        p_id: parkingId,
                        area_id: areaId,
                        area_name: areaName,
                        plan_out_time: null
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.carStorageOp.import_car_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carStorageOp.import_car_error, payload: { errorMsg: err } })
    }
}


export const updatePlanOutTime = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.carStorageOp.update_planOutTime_waiting, payload: {} })
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/carStorageRel/${param.relId}/planOutTime`
        const res = await httpRequest.put(url, {
            planOutTime: param.planOutTime
        })
        if (res.success) {
            dispatch({ type: actionTypes.carStorageOp.update_planOutTime_success, payload: {} })
            dispatch({
                type: actionTypes.carList.set_carInfoForCarList, payload: {
                    carInfo: {
                        id: param.carId,
                        plan_out_time: param.planOutTime
                    }
                }
            })
        } else {
            dispatch({ type: actionTypes.carStorageOp.update_planOutTime_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carStorageOp.update_planOutTime_error, payload: { errorMsg: err } })
    }
}