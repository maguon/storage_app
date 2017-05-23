import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { Alert } from 'react-native'

export const getCarModelsByMakeId = (param) => (dispatch) => {
    let url = `${base_host}/carMake/${param.requiredParam.carMakeId}/carModel`
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res.success) {
                    console.log('SECCUSS', res.result)
                    dispatch({
                        type: actionTypes.carModelTypes.GET_CARMODELS_SUCCESS, payload: {
                            data: {
                                isLoading: false,
                                carModels: res.result
                            }
                        }
                    });
                } else {
                    console.log('RES_FAITLED', res.msg)
                }
            }
        })
}
