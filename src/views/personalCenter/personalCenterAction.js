import * as httpRequest from '../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'
// import { ToastAndroid } from 'react-native'

export const updatePersonalImage = (param) => async (dispatch) => {
    dispatch({ type: actionTypes.personalCenter.Update_PersonalImage_waiting, payload: {} })
    try {
        const uploadUrl = `${file_host}/user/${param.uploadImage.requiredParam.userId}/image${ObjectToUrl(param.uploadImage.optionalParam)}`
        console.log('uploadUrl', uploadUrl)
        const uploadUrlRes = await httpRequest.postFile(uploadUrl, param.uploadImage.postParam)
        console.log('uploadUrlRes', uploadUrlRes)
        if (uploadUrlRes.success) {
            const updateAvatarImageUrl = `${base_host}/user/${param.updateAvatarImage.requiredParam.userId}/avatarImage`
            console.log('updateAvatarImageUrl', updateAvatarImageUrl)
            param.updateAvatarImage.putParam.avatarImage = uploadUrlRes.imageId
            const updateAvatarImageRes = await httpRequest.put(updateAvatarImageUrl, param.updateAvatarImage.putParam)
            console.log('updateAvatarImageRes', updateAvatarImageRes)
            if (updateAvatarImageRes.success) {
                dispatch({ type: actionTypes.login.change_AvatarImage, payload: { avatar_image: uploadUrlRes.imageId } })
                dispatch({ type: actionTypes.personalCenter.Update_PersonalImage_success, payload: {} })
                // ToastAndroid.showWithGravity(`修改成功！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            } else {
                dispatch({ type: actionTypes.personalCenter.Update_PersonalImage_failed, payload: { failedMsg: updateAvatarImageRes.msg } })
                // ToastAndroid.showWithGravity(`修改失败！${updateAvatarImageRes.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            }
        } else {
            dispatch({ type: actionTypes.personalCenter.Update_PersonalImage_failed, payload: { failedMsg: uploadUrlRes.msg } })
            // ToastAndroid.showWithGravity(`修改失败！${uploadUrlRes.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
        }
    } catch (err) {
        dispatch({ type: actionTypes.personalCenter.Update_PersonalImage_error, payload: { errorMsg: err } })
        // ToastAndroid.showWithGravity(`修改失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}