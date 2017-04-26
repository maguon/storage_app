import httpRequest from '../util/HttpRequest.js'
import { base_host, file_host } from '../config/Host'
import * as actionTypes from '../actions/types'


export const getCarAll = () => (dispatch) => {
        console.log('ttt')
        httpRequest
        .get(base_host + '/user/3/car', (err, res) => {
            console.log('ttt')
            if (err) {
                console.log('CARFAILED')
                Alert.alert('CARFAILED', null, [
                    { text: 'OK', onPress: () => { } }
                ]);
            } else {
                if (res.success) {
                    console.log(11)
                    dispatch({ type: actionTypes.carTypes.CARSUCCESS, payload: { data: res.result } });
                } else {
                    console.log(22)
                    Alert.alert(res.msg, null, [
                        {
                            text: 'OK', onPress: () => {

                            }
                        }
                    ])
                }
            }
        })
        console.log('ttt')

    }



