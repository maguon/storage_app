import * as actionTypes from './actionTypes'
import httpRequest from '../util/HttpRequest.js'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'
import { base_host } from '../config/Host'
import { ObjectToUrl } from '../util/ObjectToUrl'

export const getStorageList = (param) => {
    return (dispatch) => {
        let url = `${base_host}/storage?${ObjectToUrl(param.optionalParam)}`
        // dispatch({ type: actionTypes.storageTypes.GET_STORAGE_LIST_LOADING, payload: { data: { isLoading: true } } })
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

