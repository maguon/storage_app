import * as httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'

export const queryCar = param => async (dispatch, getState) => {
    try {
        const { make = {}, model = {}, entrust = {}, msoStatus = {}, storage = {}, vinCode, enterStart, enterEnd, realStart, realEnd } = param
        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${base_host}/user/${uid}/car${ObjectToUrl({
            vinCode,
            enterStart,
            enterEnd,
            realStart,
            realEnd,
            active: 1,
            msoStatus: msoStatus.id,
            makeId: make.id,
            modelId: model.id,
            entrustId: entrust.id,
            storageId: storage.id
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.carList.query_car_success, payload: { carList: res.result } })
        } else {
            dispatch({ type: actionTypes.carList.query_car_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.carList.query_car_error, payload: { errorMsg: err } })

    }
}

export const queryCarWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carList.query_car_waiting, payload: {} })
}