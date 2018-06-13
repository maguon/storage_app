import * as httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'
import moment from 'moment'

export const getStorageList = param => async (dispatch) => {
    try {
        const urls = [`${base_host}/storageDate${ObjectToUrl({ dateStart: moment().format('YYYYMMDD'), dateEnd: moment().format('YYYYMMDD') })}`,
        `${base_host}/storageParkingBalanceCount`]
        const storageDateRes = await httpRequest.get(urls[0])
        if (storageDateRes.success) {
            const storageCountRes = await httpRequest.get(urls[1])
            if (storageCountRes.success) {
                const storageList = storageDateRes.result.map(item => {
                    const count = storageCountRes.result.find(countItem => countItem.storage_id == item.id)
                    const storage = { ...item, ...count }
                    return storage
                })
                dispatch({ type: actionTypes.home.get_storageListForHome_success, payload: { storageList } })
            } else {
                dispatch({ type: actionTypes.home.get_storageListForHome_failed, payload: { failedMsg: res.msg } })
            }
        } else {
            dispatch({ type: actionTypes.home.get_storageListForHome_failed, payload: { failedMsg: storageDateRes.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.home.get_storageListForHome_error, payload: { errorMsg: err } })
    }
}



export const getStorageListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.home.get_storageListForHome_waiting, payload: {} })
}