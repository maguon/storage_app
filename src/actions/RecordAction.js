
import httpRequest from '../util/HttpRequest'
import { record_host } from '../config/Host'
import * as actionTypes from '../actions/types'
import { ObjectToUrl } from '../util/ObjectToUrl'
import { Alert } from 'react-native'

export const getRecordList = (param, isFirst = true) => (dispatch) => {
    dispatch({ type: actionTypes.recordTypes.GET_RECORD_LIST_LOADING, payload: { data: { isLoading: true } } })
    let url = `${record_host}/opRecord?${ObjectToUrl(param.optionalParam)}`
    
    httpRequest
        .get(url, (err, res) => {
            if (err) {
                console.log('FAILED', err)
            } else {
                if (res.success) {
                   
                    if (isFirst)
                        dispatch({
                            type: actionTypes.recordTypes.FIRST_GET_RECORD_LIST_SUCCESS, payload: {
                                data: {
                                    isLoading: false,
                                    records: res.result
                                }
                            }
                        })
                    else
                        dispatch({
                            type: actionTypes.recordTypes.GET_RECORD_LIST_SUCCESS, payload: {
                                data: {
                                    isLoading: false,
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