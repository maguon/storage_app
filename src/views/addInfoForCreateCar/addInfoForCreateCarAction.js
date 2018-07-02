import * as httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import * as actions from '../../actions'
import { ObjectToUrl, objectExceptNull } from '../../util/util'
import { Actions } from 'react-native-router-flux'



export const submit = param => (dispatch, getState) => {
    const { addInfoForCreateCarReducer: { data: { status } } } = getState()
    if (status == 0) {
        dispatch(createCar(param))
    } else if (status == 1) {
        dispatch(modifyCar(param))
    }
}

export const createCar = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.addInfoForCreateCar.add_infoForCreateCar_waiting, payload: {} })
        const { values: { vinCode, make = {}, model = {}, colour = {}, proDate = {}, entrust = {}, msoStatus = {}, valuation, remark } } = param
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/car`
        const res = await httpRequest.post(url, objectExceptNull({
            vin: vinCode.id,
            makeId: make.id,
            makeName: make.value != '全部' ? make.value : null,
            modelId: model.id,
            modelName: model.value != '全部' ? model.value : null,
            colour: colour.id,
            proDate: proDate.id,
            entrustId: entrust.id,
            valuation,
            msoStatus: msoStatus.id,
            remark
        }))
        if (res.success) {
            dispatch({ type: actionTypes.addInfoForCreateCar.add_infoForCreateCar_success, payload: { carId: res.id, vin: vinCode.id, } })
            dispatch(actions.importForCreateCar.getCarInfoForCreateCar({ carId: res.id, vin: vinCode.id }))
            Actions.addImageForCreateCar()
        } else {
            dispatch({ type: actionTypes.addInfoForCreateCar.add_infoForCreateCar_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addInfoForCreateCar.add_infoForCreateCar_error, payload: { errorMsg: err } })
    }

}

export const modifyCar = param => async (dispatch, getState) => {
    try {
        dispatch({ type: actionTypes.addInfoForCreateCar.modify_infoForCreateCar_waiting, payload: {} })
        const { addInfoForCreateCarReducer: { data: { carId } },
            loginReducer: { data: { user: { uid } } } } = getState()
        const { values: { vinCode, make = {}, model = {}, colour = {}, proDate = {}, entrust = {}, msoStatus = {}, valuation, remark } } = param
        const url = `${base_host}/user/${uid}/car/${carId}`
        const res = await httpRequest.put(url, objectExceptNull({
            vin: vinCode.id,
            makeId: make.id,
            makeName: make.value != '全部' ? make.value : null,
            modelId: model.id,
            modelName: model.value != '全部' ? model.value : null,
            colour: colour.id,
            proDate: proDate.id,
            entrustId: entrust.id,
            valuation,
            msoStatus: msoStatus.id,
            remark
        }))
        if (res.success) {
            dispatch({ type: actionTypes.addInfoForCreateCar.modify_infoForCreateCar_success, payload: {} })
        } else {
            dispatch({ type: actionTypes.addInfoForCreateCar.modify_infoForCreateCar_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addInfoForCreateCar.modify_infoForCreateCar_error, payload: { errorMsg: err } })
    }
}

export const setCreateCarStatusModify = param => (dispatch) => {
    dispatch({ type: actionTypes.addInfoForCreateCar.change_createCarStatus, payload: { carId: param.carId, status: 1, vin: param.vin } })
    //dispatch(actions.addImageForCreateCar.getImageForCreateCar({ carId: param.carId }))
    dispatch(actions.importForCreateCar.getCarInfoForCreateCar({ carId: param.carId, vin: param.vin }))
}