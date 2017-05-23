import httpRequest from '../util/HttpRequest.js'
import { base_host, record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getHomeData = (param) => (dispatch) => {
    // console.log('=======START======')
    let urls = [`${record_host}/opRecord?${ObjectToUrl(param.getRecordListParam.OptionalParam)}`,
    `${base_host}/storageDate?${ObjectToUrl(param.getStorageListParam.OptionalParam)}`]
    console.log(urls)
    httpRequest
        .getAll(urls, (err, res) => {
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res[0].success && res[1].success) {
                    dispatch({
                        type: actionTypes.homeTypes.GET_HOME_DATA_SUCCESS, payload: {
                            data: {
                                recordList: res[0].result,
                                storageList: res[1].result
                            }
                        }
                    })
                } else {
                    console.log('RES_FAITLED', `${res[0].msg}&&${res[1].msg}`)
                }
            }
        })
    // console.log('=======END======')
}
