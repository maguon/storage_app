import {Alert} from 'react-native';
import  * as actionTypes from './types';
import localStorageKey  from '../util/LocalStorageKey';
import localStorage from '../util/LocalStorage'
import httpRequest from '../util/HttpRequest'
import {base_host} from '../config/Host';

export const getAppLastVersion = () => {
    return (dispatch) => {
        httpRequest.get(base_host+'/app?type=1&app=1',(err,res)=>{
            if(err){
                Alert.alert('系统内部错误',null,[
                    {text: 'OK', onPress: () => {}}
                ]);
            }else{

                if(res.success){
                    dispatch({type:actionTypes.appTypes.APP_VERSION_GET,payload:{data:res.result[0]}});
                }else{
                    Alert.alert(res.msg,null,[
                        {text: 'OK', onPress: () => {

                        }}
                    ]);
                }
            }
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