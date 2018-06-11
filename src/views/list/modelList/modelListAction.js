import * as httpRequest from '../../../util/HttpRequest'
import { base_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/util'

export const getModelList = param => async (dispatch) => {
    try {
        const url = `${base_host}/carMake/${param.makeId}/carModel`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionTypes.modelList.get_modelList_success, payload: { modelList: res.result } })
        } else {
            dispatch({ type: actionTypes.modelList.get_modelList_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.modelList.get_modelList_error, payload: { errorMsg: err } })
    }
}

export const getModelListWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.modelList.get_modelList_waiting, payload: {} })
}