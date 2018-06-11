import * as httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'
import moment from 'moment'

export const getStorageList = param => async (dispatch) => {
    try {
        const url = `${base_host}/storageDate${ObjectToUrl({
            dateStart: moment().format('YYYYMMDD'),
            dateEnd: moment().format('YYYYMMDD'),
        })}`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.home.get_storageListForHome_success, payload: { storageList: res.result } })
        } else {
            dispatch({ type: actionTypes.home.get_storageListForHome_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.home.get_storageListForHome_error, payload: { errorMsg: err } })
    }
}



export const getStorageListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.home.get_storageListForHome_waiting, payload: {} })
}