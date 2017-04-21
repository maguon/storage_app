/**
 * Created by lingxue on 2017/4/21.
 */


import {Actions} from 'react-native-router-flux';


export const toLogin = () => {
    return (dispatch) => {
        Actions.login();
    }
}