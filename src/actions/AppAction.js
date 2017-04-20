import  * as actionTypes from './types';
import localStorageKey  from '../util/LocalStorageKey';
import localStorage from '../util/LocalStorage'
import httpRequest from '../util/HttpRequest'
import host from '../config/Host';

export const getAppLastVersion = () => {
    return (dispatch) => {
        httpRequest.get(host.baseUrl+'/app',params,(err,res)=>{

        })
    }
}



export const getUserId = () =>{
    return (dispatch) => {
        localStorage.loadKey(localStorageKey.USER_ID,(err,res)=>{
            const data = {
                userId:res
            };
            dispatch({type:actionTypes.appTypes.APP_USER_SET,payload:{data:data}})
        })
    }
}
export const getUserToken = () =>{
    return (dispatch) => {
        localStorage.loadKey(localStorageKey.USER_TOKEN,(err,res)=>{
            const data = {
                userToken:res
            };
            dispatch({type:actionTypes.appTypes.APP_USER_SET,payload:{data:data}})
        })
    }
}