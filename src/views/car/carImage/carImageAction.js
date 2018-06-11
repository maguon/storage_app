import * as httpRequest from '../../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/util'

export const uploadCarImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carImage.update_carImage_waiting, payload: {} })
}

export const uploadCarImage = param => async (dispatch, getState) => {
    try {
        const { cameraReses, carId, vin } = param
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { loginReducer: { data: { user } } } = getState()
            const imageUploadUrl = `${file_host}/user/${user.uid}/image${ObjectToUrl({ imageType: 1 })}`
            const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                key: 'image',
                ...item.res
            })))
            const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
            if (imageUploadSuccessReses.length > 0) {
                const bindCarUrl = `${record_host}/car/${carId}/vin/${vin}/storageImage`
                const bindCarReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindCarUrl, {
                    username: user.real_name,
                    userId: user.uid,
                    userType: user.type,
                    url: item.imageId
                })))
                const bindCarSuccessReses = bindCarReses
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, success: item.success } })
                    .filter(item => item.success)
                    .map(item => { return { url: item.imageId } })
                if (cameraReses.length === bindCarSuccessReses.length) {
                    dispatch({ type: actionTypes.carImage.update_carImage_success, payload: { imageList: bindCarSuccessReses } })
                } else if (bindCarSuccessReses.length > 0) {
                    dispatch({ type: actionTypes.carImage.update_carImage_partSuccess, payload: { imageList: bindCarSuccessReses, failedMsg: '部分失败' } })
                } else {
                    dispatch({ type: actionTypes.carImage.update_carImage_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                dispatch({ type: actionTypes.carImage.update_carImage_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            dispatch({ type: actionTypes.carImage.update_carImage_failed, payload: { failedMsg: '拍照全部失败' } })
        }

    } catch (err) {
        dispatch({ type: actionTypes.carImage.update_carImage_error, payload: { errorMsg: err } })
    }
}

export const setIndexForCarInfoImage = param => (dispatch) => {
    const { index } = param
    dispatch({ type: actionTypes.carImage.set_indexForCarInfoImage, payload: { index } })
}