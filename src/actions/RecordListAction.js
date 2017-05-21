
import httpRequest from '../util/HttpRequest'
import { record_host } from '../config/Host'
import * as actionTypes from './actionTypes'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { Alert } from 'react-native'

export const getRecordList = (param) => (dispatch) => {
    dispatch({ type: actionTypes.recordTypes.GET_RECORD_LIST_LOADING, payload: { data: { isLoading: true } } })
    let urls = [`${record_host}/opRecord?${ObjectToUrl(param.optionalParam)}`,
    `${base_host}/storage?${ObjectToUrl(param.optionalParam)}`]//`${record_host}/opRecord?${ObjectToUrl(param.optionalParam)}`

    httpRequest
        .get(url, (err, res) => {
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res.success) {
                    dispatch({
                        type: actionTypes.re.FIRST_GET_RECORD_LIST_SUCCESS, payload: {
                            data: {
                                records: res.result
                            }
                        }
                    })
                } else {
                    console.log('RES_FAITLED', res.msg)
                }
            }
        })

}