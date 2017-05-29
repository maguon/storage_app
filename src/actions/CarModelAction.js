import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'

export const getCarModelsByMakeId = (param) => (dispatch) => {
    dispatch({ type: actionTypes.carModelTypes.GET_CARMODELS_WAITING, payload: {} })
    let url = `${base_host}/carMake/${param.requiredParam.carMakeId}/carModel`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carModelTypes.GET_CARMODELS_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carModelTypes.GET_CARMODELS_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.carModelTypes.GET_CARMODELS_FAILED, payload: { data: res.msg } })
                }
            }
        })
}
