import * as httpRequest from '../../util/HttpRequest'
import { base_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'

export const queryCar = param => async (dispatch, getState) => {
    try {
        // const { make = {}, model = {}, entrust = {}, msoStatus = {}, storage = {}, vinCode, enterStart, enterEnd, realStart, realEnd } = param
        //= { make: {}, model: {}, entrust: {}, msoStatus: {}, storage: {}, vinCode: null, enterStart: null, enterEnd: null, realStart: null, realEnd: null }
        const { loginReducer: { data: { user: { uid } } },
            form: { SearchCarForm: { values } } } = getState()
        // console.log('getState()', getState())//SearchCarForm
        // console.log('values', values)

        const url = `${base_host}/user/${uid}/car${ObjectToUrl({
            vinCode: values && values.vinCode ? values.vinCode : null,
            enterStart: values && values.enterStart ? values.enterStart : null,
            enterEnd: values && values.enterEnd ? values.enterEnd : null,
            realStart: values && values.realStart ? values.realStart : null,
            realEnd: values && values.realEnd ? values.realEnd : null,
            // // active: 1,
            msoStatus: values && values.msoStatus ? values.msoStatus.id : null,
            makeId: values && values.make ? values.make.id : null,
            modelId: values && values.model ? values.model.id : null,
            entrustId: values && values.entrust ? values.entrust.id : null,
            storageId: values && values.storage ? values.storage.id : null,
        })}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.carList.query_car_success, payload: { carList: res.result } })
        } else {
            dispatch({ type: actionTypes.carList.query_car_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        //  console.log('err', err)
        dispatch({ type: actionTypes.carList.query_car_error, payload: { errorMsg: err } })
    }
}

export const queryCarWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carList.query_car_waiting, payload: {} })
}