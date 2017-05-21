/**
 * Created by lingxue on 2017/4/17.
 */
import * as actionTypes from './actionTypes'
import httpRequest from '../util/HttpRequest.js'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'
import { base_host } from '../config/Host'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getStorageParkingList = (param) => {
    return (dispatch) => {
        let url = `${base_host}/storageParking?${ObjectToUrl(param.optionalParam)}`
        // dispatch({ type: actionTypes.storageParkingTypes.GET_STORAGE_PARKING_LIST_LOADING, payload: { data: { isLoading: true } } })
        httpRequest
            .get(url, (err, res) => {

                if (err) {
                    console.log('FAILED', err)
                } else {
                    if (res.success) {

                        dispatch({
                            type: actionTypes.storageParkingTypes.GET_STORAGE_PARKING_LIST_SUCCESS, payload: {
                                data: {
                                    isLoading: false,
                                    storageParkings: res.result
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

