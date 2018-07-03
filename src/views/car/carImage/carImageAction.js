import * as httpRequest from '../../../util/HttpRequest'
import { file_host, record_host } from '../../../config/Host'
import * as actionTypes from '../../../actionTypes'
import { ObjectToUrl } from '../../../util/util'
import * as Toast from '../../../components/share/Toast'

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
                    Toast.show('照片上传成功！', 10)
                    dispatch({ type: actionTypes.carImage.update_carImage_success, payload: { imageList: bindCarSuccessReses } })
                } else if (bindCarSuccessReses.length > 0) {
                    Toast.show(`照片上传部分成功：${bindCarSuccessReses.length}/${cameraReses.length}！`, 10)
                    dispatch({ type: actionTypes.carImage.update_carImage_partSuccess, payload: { imageList: bindCarSuccessReses, failedMsg: '部分失败' } })
                } else {
                    Toast.show('照片上传全部失败！', 10)
                    dispatch({ type: actionTypes.carImage.update_carImage_failed, payload: { failedMsg: '全部失败' } })
                }
            } else {
                Toast.show('照片上传全部失败！', 10)
                dispatch({ type: actionTypes.carImage.update_carImage_failed, payload: { failedMsg: '全部失败' } })
            }
        } else {
            Toast.show('照片上传全部失败！', 10)
            dispatch({ type: actionTypes.carImage.update_carImage_failed, payload: { failedMsg: '拍照全部失败' } })
        }

    } catch (err) {
        Toast.show(`照片上传全部失败:${err}！`, 10)
        dispatch({ type: actionTypes.carImage.update_carImage_error, payload: { errorMsg: err } })
    }
}

export const setIndexForCarInfoImage = param => (dispatch) => {
    const { index } = param
    dispatch({ type: actionTypes.carImage.set_indexForCarInfoImage, payload: { index } })
}

export const uploadCarVideo = param => async (dispatch, getState) => {
    try {
        const { source, carId, vin } = param
        const { loginReducer: { data: { user: { uid, type, real_name } } } } = getState()
        const uploadVideoUrl = `${file_host}/user/${uid}/video${ObjectToUrl({ videoType: 1, userType: type })}`
        const uploadVideoRes = await httpRequest.postFile(uploadVideoUrl, {
            key: 'file',
            imageUrl: source,
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
                dispatch({ type: actionTypes.carImage.upload_videoForCarInfo_success, payload: { videoUrl: uploadVideoRes.result.id } })
                Toast.show('视频上传成功！', 10)
            } else {
                dispatch({ type: actionTypes.carImage.upload_videoForCarInfo_failed, payload: { failedMsg: res.msg } })
                Toast.show(`视频上传失败，${failedMsg}！`, 10)
            }
        }
    } catch (err) {
        dispatch({ type: actionTypes.carImage.upload_videoForCarInfo_error, payload: { errorMsg: err } })
        Toast.show(`视频上传失败，${err}！`, 10)
    }
}

export const uploadCarVideoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.carImage.upload_videoForCarInfo_waiting, payload: {} })
}