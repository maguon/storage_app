import httpRequest from '../util/HttpRequest.js'
import { base_host } from '../config/Host'
import * as actionTypes from './actionTypes'

export const getCarMakesAll = () => (dispatch) => {
    dispatch({ type: actionTypes.carMakeTypes.GET_CARMAKES_WAITING, payload: {} })
    let url = `${base_host}/carMake`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                dispatch({ type: actionTypes.carMakeTypes.GET_CARMAKES_ERROR, payload: { data: err } })
            } else {
                if (res.success) {
                    dispatch({ type: actionTypes.carMakeTypes.GET_CARMAKES_SUCCESS, payload: { data: res.result } })
                } else {
                    dispatch({ type: actionTypes.carMakeTypes.GET_CARMAKES_FAILED, payload: { data: res.msg } })
                }
            }
        })
}

