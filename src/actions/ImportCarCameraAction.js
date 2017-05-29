import httpRequest from '../util/HttpRequest.js'
import { record_host, file_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'


export const pushCarImage = (param) => (dispatch) => {
    //console.log('pushCarImage',param)
    let url = `${file_host}user/${param.requiredParam.userId}/image?${ObjectToUrl(param.optionalParam)}`
    httpRequest
        .postFile(url, param.postFileParam, (err, res) => {
            if (err) {
                console.log('FAILED', err)
            } else {
                //console.log('res', res.success)
                if (res.success) {
                    //console.log('SUCCESS', res)
                    url = `${record_host}/car/${param.requiredParam.carId}/vin/${param.requiredParam.vin}/storageImage`
                    console.log('url',url)
                    param.postParam.url = res.imageId
                    console.log('param',param)
                    httpRequest.post(url, param.postParam, (carErr, carRes) => {
                        if (carErr) {
                            console.log('FAILED', carErr)
                        } else {
                            if (carRes.success) {
                                console.log('SUCCESS', carRes)
                                dispatch({
                                    type: actionTypes.importCarCameraTypes.IMPORT_CAR_IMAGE_SUCCESS, payload: {
                                        data: {
                                            isLoading: false,
                                            imageUrl: `${file_host}image/${res.imageId}`
                                        }
                                    }
                                })
                            }
                            else {
                                console.log('RES_FAITLED', carRes.msg)
                            }
                        }
                    })

                } else {
                    console.log('RES_FAITLEDimage', res.msg)
                }
            }
        })
}
