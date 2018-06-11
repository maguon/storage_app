import * as httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl, objectExceptNull } from '../../../util/util'
import moment from 'moment'


export const updateCarInfo = param => async (dispatch, getState) => {
    try {
        const { carId, make, model, proDate, remark, valuation, colour, entrust, msoStatus, vin } = param
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/car/${carId}`
        const res = await httpRequest.put(url, objectExceptNull({
            makeId: make.id,
            makeName: make.value,
            modelId: model.id,
            modelName: model.value,
            colour: colour.id,
            entrustId: entrust.id,
            proDate: proDate.id,
            remark,
            vin,
            valuation,
            msoStatus: msoStatus.id
        }))
        if (res.success) {
            dispatch({ type: actionTypes.carInfoEditor.update_carInfo_success, payload: {} })
            dispatch({
                type: actionTypes.carList.set_carInfoForCarList, payload: {
                    carInfo: objectExceptNull({
                        id: carId,
                        make_id: make.id,
                        make_name: make.value,
                        model_id: model.id,
                        model_name: model.value,
                        colour: colour.id,
                        entrust_id: entrust.id,
                        entrust_name: entrust.value,
                        pro_date: proDate.id,
                        remark,
                        vin,
                        valuation,
                        mso_status: msoStatus.id
                    })
                }
            })
        } else {
            dispatch({ type: actionTypes.carInfoEditor.update_carInfo_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carInfoEditor.update_carInfo_error, payload: { errorMsg: err } })
    }
}

export const updateCarInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carInfoEditor.update_carInfo_waiting, payload: {} })
}