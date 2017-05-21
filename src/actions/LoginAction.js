import * as actionTypes from './actionTypes'
import httpRequest from '../util/HttpRequest.js'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'
import { base_host } from '../config/Host'
import requestHeaders from '../util/RequestHeaders'

export const login = (params) => {
    return (dispatch) => {
        httpRequest.post(`${base_host}/userLogin`, params.postParam, (err, res) => {
            if (err) {
                //登录失败重新登录
                console.log('err')
            } else {

                if (res.success) {
                    console.log('success', res)
                    //判断请求是否成功，如果成功，更新token
                    localStorage.saveKey(localStorageKey.USER, {
                        userId: res.result.userId,
                        token: res.result.accessToken,
                        userType: res.result.type,
                        userStatus: res.result.userStatus
                    })
                    requestHeaders.set('auth-token', res.result.accessToken)
                    requestHeaders.set('user-type', res.result.type)
                    httpRequest
                        .get(`${base_host}/user/${res.result.userId}`, (getUserInfoErr, getUserInfoRes) => {
                            if (getUserInfoErr) {
                                console.log('getUserInfoErr', getUserInfoErr)
                            }
                            else {
                                if (getUserInfoRes.success) {
                                    let user = {
                                        userId: res.result.userId,
                                        token: res.result.accessToken,
                                        userType: res.result.type,
                                        userStatus: res.result.userStatus,
                                        mobile: getUserInfoRes.result[0].mobile
                                    }
                                    localStorage.saveKey(localStorageKey.USER, user)
                                    requestHeaders.set('user-name', getUserInfoRes.result[0].mobile)
                                    dispatch({ type: actionTypes.loginTypes.LOGIN_SUCCESS, payload: { data: user } })
                                }
                                else {
                                    //取用户名失败，错误处理
                                    console.log('getUserInfoResfailed', getUserInfoRes)
                                }
                            }
                        })
                } else {
                    //登录失败重新登录
                    console.log('failed')
                }
            }
        })
    }
}
