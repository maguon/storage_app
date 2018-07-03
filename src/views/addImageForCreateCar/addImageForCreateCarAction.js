import * as httpRequest from '../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl, objectExceptNull } from '../../util/util'
import * as Toast from '../../components/share/Toast'

export const uploadCarImageWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.addImageForCreateCar.upload_imageForCreateCar_waiting, payload: {} })
}

export const uploadCarImage = param => async (dispatch, getState) => {
    try {
        const { cameraReses } = param
        const cameraSuccessReses = cameraReses.filter(item => item.success)
        if (cameraSuccessReses.length > 0) {
            const { loginReducer: { data: { user } }, addInfoForCreateCarReducer: { data: { carId, vin } } } = getState()
            const imageUploadUrl = `${file_host}/user/${user.uid}/image${ObjectToUrl({ imageType: 1 })}`
            const imageUploadReses = await Promise.all(cameraSuccessReses.map(item => httpRequest.postFile(imageUploadUrl, {
                key: 'image',
                ...item.res
            })))
            const imageUploadSuccessReses = imageUploadReses.filter(item => item.success)
            if (imageUploadSuccessReses.length > 0) {
                const bindCarUrl = url = `${record_host}/car/${carId}/vin/${vin}/storageImage`
                const bindCarReses = await Promise.all(imageUploadSuccessReses.map(item => httpRequest.post(bindCarUrl, {
                    username: user.real_name,
                    userId: user.uid,
                    userType: user.type,
                    url: item.imageId
                })))
                const imageList = bindCarReses
                    .map((item, index) => { return { imageId: imageUploadSuccessReses[index].imageId, res: item, } })
                    .filter(item => item.res.success)
                    .map(item => {
                        return item.imageId
                    })
                if (cameraReses.length === imageList.length) {
                    const getRecordIdUrl = `${record_host}/user/${user.uid}/car/${carId}/record`
                    const getRecordIdRes = await httpRequest.get(getRecordIdUrl)
                    const recordId = getRecordIdRes.result[0]._id
                    Toast.show('照片上传成功！', 10)
                    dispatch({ type: actionTypes.addImageForCreateCar.upload_imageForCreateCar_success, payload: { imageList: imageList, recordId } })
                } else if (imageList.length > 0) {
                    const getRecordIdUrl = `${record_host}/user/${user.uid}/car/${carId}/record`
                    const getRecordIdRes = await httpRequest.get(getRecordIdUrl)
                    const recordId = getRecordIdRes.result[0]._id
                    Toast.show(`照片上传部分成功：${bindCarSuccessReses.length}/${cameraReses.length}！`, 10)
                    dispatch({ type: actionTypes.addImageForCreateCar.upload_imageForCreateCar_partSuccess, payload: { imageList: imageList, recordId, failedMsg: '部分失败' } })
                } else {
                    Toast.show('照片上传全部失败！', 10)
                    dispatch({ type: actionTypes.addImageForCreateCar.upload_imageForCreateCar_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                Toast.show('照片上传全部失败！', 10)
                dispatch({ type: actionTypes.addImageForCreateCar.upload_imageForCreateCar_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            Toast.show('照片上传全部失败！', 10)
            dispatch({ type: actionTypes.addImageForCreateCar.upload_imageForCreateCar_failed, payload: { failedMsg: '拍照全部失败' } })
        }
    }
    catch (err) {
        Toast.show(`照片上传全部失败:${err}！`, 10)
        dispatch({ type: actionTypes.addImageForCreateCar.upload_imageForCreateCar_error, payload: { errorMsg: err } })
    }
}


export const setIndexForUploadImageForCreateCar = param => (dispatch) => {
    const { index } = param
    dispatch({ type: actionTypes.addImageForCreateCar.set_indexForUploadImageForCreateCar, payload: { index } })
}

export const cleanCreateCar = () => (dispatch) => {
    dispatch({ type: actionTypes.addImageForCreateCar.clean_imageForCreateCar, payload: {} })
    dispatch({ type: actionTypes.addInfoForCreateCar.clean_infoForCreateCar, payload: {} })
    dispatch({ type: actionTypes.importForCreateCar.clean_importForCreateCar, payload: {} })
}

export const getImageForCreateCar = param => async (dispatch, getState) => {
    try {

        const { loginReducer: { data: { user: { uid } } } } = getState()
        const url = `${record_host}/user/${uid}/car/${param.carId}/record`
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({
                type: actionTypes.addImageForCreateCar.get_imageForCreateCar_success, payload: {
                    imageList: res.result[0] ? res.result[0].storage_image.map(item => item.url) : [],
                    recordId: res.result[0] ? res.result[0]._id : null,
                    videoUrl: res.result[0] && res.result[0].video[0] ? res.result[0].video[0].url : null
                }
            })
        } else {
            dispatch({ type: actionTypes.addImageForCreateCar.get_imageForCreateCar_failed, payload: { failedMsg: res.msg } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.addImageForCreateCar.get_imageForCreateCar_error, payload: { errorMsg: err } })
    }
}

export const getImageForCreateCarWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.addImageForCreateCar.get_imageForCreateCar_waiting, payload: {} })
}

export const uploadCarVideo = param => async (dispatch, getState) => {
    try {
        const { loginReducer: { data: { user: { uid, type, real_name } } }, addInfoForCreateCarReducer: { data: { carId, vin } } } = getState()
        const uploadVideoUrl = `${file_host}/user/${uid}/video${ObjectToUrl({ videoType: 1, userType: type })}`
        const uploadVideoRes = await httpRequest.postFile(uploadVideoUrl, {
            key: 'file',
            imageUrl: param.source,
            imageType: 'video/mp4',
            imageName: 'video.mp4'
        })
        if (uploadVideoRes.success) {
            const uploadVideoRecordUrl = `${record_host}/car/${carId}/vin/${vin}/video`
            const uploadVideoRecordRes = await httpRequest.post(uploadVideoRecordUrl, {
                username: real_name,
                userId: uid,
                userType: type,
                url: uploadVideoRes.result.id
            })
            if (uploadVideoRecordRes.success) {
                dispatch({ type: actionTypes.addImageForCreateCar.upload_videoForCreateCar_success, payload: { videoUrl: uploadVideoRes.result.id } })
                Toast.show('视频上传成功！', 10)
            } else {
                dispatch({ type: actionTypes.addImageForCreateCar.upload_videoForCreateCar_failed, payload: { failedMsg: res.msg } })
                Toast.show(`视频上传失败，${failedMsg}！`, 10)
            }
        }
    } catch (err) {
        dispatch({ type: actionTypes.addImageForCreateCar.upload_videoForCreateCar_error, payload: { errorMsg: err } })
        Toast.show(`视频上传失败，${err}！`, 10)
    }
}

export const uploadCarVideoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.addImageForCreateCar.upload_videoForCreateCar_waiting, payload: {} })
}