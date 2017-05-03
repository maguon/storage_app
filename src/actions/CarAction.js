import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host } from '../config/Host'
import * as actionTypes from '../actions/types'


export const getCarAll = (user) => (dispatch) => {
    console.log('=======START======')
    let url = `${base_host}/user/${user.id}/car`
    console.log(url)
    httpRequest
        .get(url, (err, res) => {
            console.log('ttt')
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res.success) {

                    console.log('SECCUSS', res.result)
                    dispatch({ type: actionTypes.carTypes.GET_CARS_SUCCESS, payload: { data: res.result } });
                } else {
                    console.log('RES_FAITLED', res.msg)
                }
            }
        })
    console.log('=======END======')

}

export const getCarById = (carId) => (dispatch) => {
    dispatch({ type: actionTypes.carTypes.GET_CARS_SUCCESS, payload: { data: rcarId} });

}




