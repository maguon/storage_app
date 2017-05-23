/**
 * Created by lingxue on 2017/4/21.
 */
import { Actions } from 'react-native-router-flux'
import * as actionTypes from './actionTypes'
import localStorageKey from '../util/LocalStorageKey'
import localStorage from '../util/LocalStorage'
import httpRequest from '../util/HttpRequest'
import { base_host } from '../config/Host'
import { ObjectToUrl } from '../util/ObjectToUrl'
import requestHeaders from '../util/RequestHeaders'


//获取最新version信息
export const getAppLastVersion = (param) => (dispatch) => {
    dispatch({ type: actionTypes.welcomeActionTypes.GET_VERSION_WAITING, payload: {} })
    return httpRequest.get(`${base_host}/app?${ObjectToUrl(param.optionalParam)}`, (err, res) => {
        if (err) {
            dispatch({ type: actionTypes.welcomeActionTypes.GET_VERSION_ERROR, payload: { data: err } })
        } else {
            if (res.success) {
                dispatch({ type: actionTypes.welcomeActionTypes.GET_VERSION_SUCCESS, payload: { data: res.result } })
            } else {
                dispatch({ type: actionTypes.welcomeActionTypes.GET_VERSION_FAILED, payload: { data: err } })
            }
        }
    })

}

//验证localStorage中的token，请求更换token,请求更新userInformation
export const validateToken = () => (dispatch) => {
    // console.log(localStorage)
    localStorage.loadKey(localStorageKey.USER, (localStorageErr, localStorageRes) => {
        if (localStorageErr) {
            if (localStorageErr.name == 'NotFoundError') {
                console.log('NotFoundError')
                //跳转到登录页面
                dispatch({ type: actionTypes.welcomeActionTypes.VALIDATE_TOKEN_FAILED, payload: {} })
            }
            else if (localStorageErr.name == 'ExpiredError') {
                //未知错误处理,删除本地缓存
                localStorage.removeKey(localStorageKey.USER)
                dispatch({ type: actionTypes.welcomeActionTypes.VALIDATE_TOKEN_FAILED, payload: {} })
            }
        }
        else {
            if (localStorageRes.token && localStorageRes.userId) {
                //判断userId与token是否为空，如果都不为空,请求更换token 
                httpRequest
                    .get(`${base_host}/user/${localStorageRes.userId}/token/${localStorageRes.token}`, (changeTokenErr, changeTokenRes) => {
                        if (changeTokenErr) {
                            //判断网络连接层是否有问题，如果有问题提醒用户
                            console.log('changeTokenErr', changeTokenErr)
                        }
                        else {
                            if (changeTokenRes.success) {
                                //判断请求是否成功，如果成功，更新token
                                localStorage.saveKey(localStorageKey.USER, {
                                    userId: changeTokenRes.result.userId,
                                    token: changeTokenRes.result.accessToken,
                                    userType: changeTokenRes.result.type,
                                    userStatus: changeTokenRes.result.userStatus
                                })
                                requestHeaders.set('auth-token', changeTokenRes.result.accessToken)
                                requestHeaders.set('user-type', changeTokenRes.result.type)
                                httpRequest
                                    .get(`${base_host}/user/${localStorageRes.userId}`, (getUserInfoErr, getUserInfoRes) => {
                                        if (getUserInfoErr) {
                                            console.log('getUserInfoErr', getUserInfoErr)
                                        }
                                        else {
                                            if (getUserInfoRes.success) {
                                                localStorage.saveKey(localStorageKey.USER, {
                                                    userId: changeTokenRes.result.userId,
                                                    token: changeTokenRes.result.accessToken,
                                                    userType: changeTokenRes.result.type,
                                                    userStatus: changeTokenRes.result.userStatus,
                                                    mobile: getUserInfoRes.result[0].mobile
                                                })
                                                requestHeaders.set('user-name', getUserInfoRes.result[0].mobile)
                                                dispatch({
                                                    type: actionTypes.loginTypes.LOGIN_SUCCESS, payload: {
                                                        data: {
                                                            userId: changeTokenRes.result.userId,
                                                            token: changeTokenRes.result.accessToken,
                                                            userType: changeTokenRes.result.type,
                                                            userStatus: changeTokenRes.result.userStatus,
                                                            mobile: getUserInfoRes.result[0].mobile
                                                        }
                                                    }
                                                })
                                                dispatch({ type: actionTypes.welcomeActionTypes.VALIDATE_TOKEN_SUCCESS, payload: {} })


                                            }
                                            else {
                                                //取用户名失败，错误处理
                                                console.log('getUserInfoResfailed', getUserInfoRes)
                                            }
                                        }
                                    })
                            }
                            else {
                                //判断请求是否成功，如果失败，跳转到登录页
                                console.log('changeTokenResfailed', changeTokenRes)
                                dispatch({ type: actionTypes.welcomeActionTypes.VALIDATE_TOKEN_FAILED, payload: {} })
                            }
                        }
                    })
            }
            else {
                //判断userId与token是否为空，如果有一个为空，跳转到登录页面
                dispatch({ type: actionTypes.welcomeActionTypes.VALIDATE_TOKEN_FAILED, payload: {} })
            }
        }
    })
}

