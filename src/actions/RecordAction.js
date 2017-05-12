
import httpRequest from '../util/HttpRequest.js'
import { record_host } from '../config/Host'
import * as actionTypes from '../actions/types'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { Alert } from 'react-native'

export const getRecordList = (param, isFirst = true) => (dispatch) => {
    console.log('=======START======')
    console.log(param)
    let url = `${record_host}/opRecord?${ObjectToUrl(param.optionalParam)}`
    console.log(url)
    httpRequest
        .get(url, (err, res) => {
            console.log('===res===')
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res.success) {
                    console.log('SECCUSS', res.result)
                    if (isFirst)
                        dispatch({ type: actionTypes.recordTypes.FIRST_GET_RECORD_LIST_SUCCESS, payload: { data: res.result } })
                    else
                        dispatch({ type: actionTypes.recordTypes.GET_RECORD_LIST_SUCCESS, payload: { data: res.result } })
                } else {
                    console.log('RES_FAITLED', res.msg)
                }
            }
        })
    console.log('=======END======')
}