import * as httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'

export const getCarList = param => async (dispatch) => {
    try {
        const url = `${base_host}/carList${ObjectToUrl({ vinCode: param.vinCode, start: 0, size: 10 })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.searchCarForCreateCar.get_carListForCreateCar_success, payload: { carList: res.result } })

        } else {
            dispatch({ type: actionTypes.searchCarForCreateCar.get_carListForCreateCar_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.searchCarForCreateCar.get_carListForCreateCar_error, payload: { errorMsg: err } })
    }
}

export const getCarListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.searchCarForCreateCar.get_carListForCreateCar_waiting, payload: {} })
}

export const cleanCarList = () => (dispatch) => {
    dispatch({ type: actionTypes.searchCarForCreateCar.clean_carListForCreateCar, payload: {} })
}