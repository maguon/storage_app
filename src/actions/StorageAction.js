/**
 * Created by lingxue on 2017/4/17.
 */
import * as actionTypes from './types';
import httpRequest from '../util/HttpRequest.js';
import localStorageKey from '../util/LocalStorageKey';
import localStorage from '../util/LocalStorage';
import { base_host, file_host } from '../config/Host';

export const getStorageList = () => {
    let now = new Date()
    year = now.getFullYear()
    month = now.getMonth() + 1
    month = month >= 10 ? month : `0${month}`
    day = now.getDate()
    day = day >= 10 ? day : `0${day}`
    now=`${year}${month}${day}`

    return (dispatch) => {
        
        let url = `${base_host}/storageDate?dateStart=${now}&dateEnd=${now}`
        
        dispatch({ type: actionTypes.storageTypes.GET_STORAGE_LIST_LOADING, payload: { data: { isLoading: true } } })
        httpRequest
            .get(url, (err, res) => {
                
                if (err) {
                    console.log('FAILED', err)
                } else {
                    if (res.success) {
                       
                        dispatch({
                            type: actionTypes.storageTypes.GET_STORAGE_LIST_SUCCESS, payload: {
                                data: {
                                    isLoading: false,
                                    storages: res.result
                                }
                            }
                        })
                    } else {
                        console.log('RES_FAITLED', res.msg)
                    }
                }
            })
        
    }
}

export const getParkingById = (storageId) => {
    return (dispatch) => {
        console.log('=======START======')

        let url = `${base_host}/storageParking?storageId=${storageId}`

        httpRequest
            .get(url, (err, res) => {
                console.log('ttt')
                if (err) {
                    console.log('FAILED', err)
                 } else {
                    if (res.success) {
                        console.log('SECCUSS', res)
                        dispatch({ type: actionTypes.storageTypes.GET_PARKING_BY_ID, payload: { data: res.result,id: storageId} });
                    } else {
                        console.log('RES_FAITLED', res.msg)
                    }
                }
            
            })


        console.log('=======END======')
    }
}
