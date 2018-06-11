import * as httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'

export const getKeyCabinetAreaList = param => async (dispatch) => {
    try {
        const url = `${base_host}/carKeyCabinetArea${ObjectToUrl({ areaStatus: 1, carKeyCabinetId: param.carKeyCabinetId })}`
        console.log('url',url)
        const res = await httpRequest.get(url)
        console.log('res',res)
        
        if (res.success) {
            dispatch({ type: actionTypes.keyCabinetArea.get_keyCabinetAreaList_success, payload: { keyCabinetAreaList: res.result } })
        } else {
            dispatch({ type: actionTypes.keyCabinetArea.get_keyCabinetAreaList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.keyCabinetArea.get_keyCabinetAreaList_error, payload: { errorMsg: err } })
    }
}

export const getKeyCabinetAreaListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.keyCabinetArea.get_keyCabinetAreaList_waiting, payload: {} })
}