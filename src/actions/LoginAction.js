import  * as actionTypes from './actionTypes';
import httpRequest from '../util/HttpRequest.js';
import localStorageKey  from '../util/LocalStorageKey';
import localStorage from '../util/LocalStorage';
import {Actions} from 'react-native-router-flux';
import {Alert} from 'react-native';
import {base_host,file_host} from '../config/Host';

export const login = (username,password) => {
    return (dispatch) => {
        let params = {
            username : username,
            password : password
        }
        httpRequest.post(base_host+'/admin/do/login',params,(err,res)=>{
            if(res){
                if(res.success){
                    dispatch({type:actionTypes.loginTypes.LOGIN_PASSWORD_CHANGE,payload:{data:''}})
                    dispatch({type:actionTypes.userTypes.USER_INFO_SET,payload:{data:res.result}})
                    Actions.main();
                }else{
                    Alert.alert(res.msg,null,[
                        {text: 'OK', onPress: () => {

                        }}
                    ]);
                }


            }else{
                //dispatch({ type: actionTypes.loginTypes.LOGIN_MODAL_CLOSE });
                Alert.alert('系统内部错误',null,[
                    {text: 'OK', onPress: () => {}}
                ]);
            }
        })
    }
}

export const changeUserName = (val) => {
    return (dispatch) => {
        dispatch({type:actionTypes.loginTypes.LOGIN_USERNAME_CHANGE,payload:{data:val}})
    }
}

export const changePassword = (val) => {
    return (dispatch) => {
        dispatch({type:actionTypes.loginTypes.LOGIN_PASSWORD_CHANGE,payload:{data:val}})
    }
}