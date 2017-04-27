
import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host } from '../config/Host'
import * as actionTypes from '../actions/types'
import {Alert} from 'react-native'


export const getCarMakesAll = () => (dispatch) => {
        console.log('=======START======')
        let url=`${base_host}/carMake`
        console.log(url)
        httpRequest
        .get(url, (err, res) => {
            console.log('ttt')
            if (err) {
                console.log('FAILED',err)
            } else {
                if (res.success) {
                    console.log('SECCUSS')
                    dispatch({ type: actionTypes.carMakeTypes.CAR_MAKES_SUCCESS, payload: { data: res.result } });
                } else {
                    console.log('RES_FAITLED',res.msg)
                }
            }
        })
        console.log('=======END======')

    }
