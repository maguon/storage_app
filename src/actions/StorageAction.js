/**
 * Created by lingxue on 2017/4/17.
 */
import  * as actionTypes from './types';
import httpRequest from '../util/HttpRequest.js';
import localStorageKey  from '../util/LocalStorageKey';
import localStorage from '../util/LocalStorage';
import {base_host,file_host} from '../config/Host';

export const getStorageList = () => {
    return (dispatch) => {
        httpRequest.get(base_host + '/storage', (err, res)=> {
            if (res) {
                if (res.success) {

                    dispatch({type: actionTypes.storageTypes.STORAGE_LIST_GET, payload: {data: res.result}})
                } else {

                }


            } else {
                dispatch({type: actionTypes.appTypes.APP_SYSTEM_ERROR});
            }
        })
    }
}
