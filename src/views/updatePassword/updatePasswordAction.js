import * as httpRequest from '../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'
import { getFormValues } from 'redux-form'
import { ToastAndroid } from 'react-native'
import * as actions from '../../actions'

export const updatePassword = () => async (dispatch, getState) => {
    const state = getState()
    const { confirmPassword, newPassword, oldPassword } = getFormValues('updatePasswordForm')(state)
    const { loginReducer: { data: { user: { uid } } } } = state
    if (newPassword == confirmPassword) {
        try {
            const url = `${base_host}/user/${uid}/password`
            console.log('url', url)
            const res = await httpRequest.put(url, {
                originPassword: oldPassword,
                newPassword
            })
            console.log('res', res)

            if (res.success) {
                // ToastAndroid.showWithGravity(`修改成功，请重新登录！`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.updatePassword.change_Password_success, payload: {} })
                dispatch(actions.login.cleanLogin())
            } else {
                // ToastAndroid.showWithGravity(`修改失败！${res.msg}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
                dispatch({ type: actionTypes.updatePassword.change_Password_failed, payload: { failedMsg: res.msg } })
            }
        } catch (err) {
            // ToastAndroid.showWithGravity(`修改失败！${err}`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
            dispatch({ type: actionTypes.updatePassword.change_Password_error, payload: { errorMsg: err } })
        }
    } else {
        console.log('res', res)
        
        // ToastAndroid.showWithGravity(`两次输入的新密码不同!`, ToastAndroid.CENTER, ToastAndroid.BOTTOM)
    }
}
