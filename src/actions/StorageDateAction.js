/**
 * Created by lingxue on 2017/4/17.
 */
import * as actionTypes from './actionTypes'
import httpRequest from '../util/HttpRequest.js'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'
import { base_host } from '../config/Host'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getStorageList = (param) => {
    return (dispatch) => {
        let url = `${base_host}/storageDate?${ObjectToUrl(param.optionalParam)}`
        dispatch({ type: actionTypes.storageDateTypes.GET_STORAGE_DATE_LIST_LOADING, payload: { data: { isLoading: true } } })
        httpRequest
            .get(url, (err, res) => {

                if (err) {
                    console.log('FAILED', err)
                } else {
                    if (res.success) {

                        dispatch({
                            type: actionTypes.storageDateTypes.GET_STORAGE_DATE_LIST_SUCCESS, payload: {
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

// export const getParkingById = (storageId) => {
//     return (dispatch) => {
//         console.log('=======START======')
//
//         let url = `${base_host}/storageParking?storageId=${storageId}`
//
//         httpRequest
//             .get(url, (err, res) => {
//                 console.log('ttt')
//                 if (err) {
//                     console.log('FAILED', err)
//                  } else {
//                     if (res.success) {
//                         console.log('SECCUSS', res)
//                         dispatch({ type: actionTypes.storageTypes.GET_PARKING_BY_ID, payload: { data: res.result,id: storageId} });
//                     } else {
//                         console.log('RES_FAITLED', res.msg)
//                     }
//                 }
//
//             })
//
//
//         console.log('=======END======')
//     }
// }