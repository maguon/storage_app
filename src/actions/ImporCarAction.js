import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const ImportCar = (param) => (dispatch) => {
    let url = `${base_host}/user/${param.requiredParam.userid}/carStorageRel`
    console.log('param.postParam', JSON.stringify(param.postParam))
    httpRequest
        .post(url, param.postParam, (err, res) => {
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res.success) {
                    console.log('SUCCESS', res)
                    dispatch({
                        type: actionTypes.imporCarTypes.IMPORT_CAR_SUCCESS, payload: {
                            data: {
                                isLoading: false,
                                carId: res.id
                            }
                        }
                    })
                } else {
                    console.log('RES_FAITLED', res.msg)
                }
            }
        })
}

