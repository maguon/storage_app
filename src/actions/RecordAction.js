
import httpRequest from '../util/HttpRequest.js'
import { record_host } from '../config/Host'
import * as actionTypes from '../actions/types'
import {Alert} from 'react-native'


export const getRecordsAllByUser = (user) => (dispatch) => {
        console.log('=======START======')
        console.log(user)
        let url=`${record_host}/opRecord?userId=${user.id}`
        console.log(url)
        httpRequest
        .get(url, (err, res) => {
            console.log('===res===')
            if (err) {
                console.log('FAILED',err)
            } else {
                if (res.success) {
                    console.log('SECCUSS',res.result)
                    dispatch({ type: actionTypes.recordTypes.GET_RECORDS_SUCCESS, payload: { data: res.result } });
                } else {
                    console.log('RES_FAITLED',res.msg)
                }
            }
        })
        console.log('=======END======')

    }