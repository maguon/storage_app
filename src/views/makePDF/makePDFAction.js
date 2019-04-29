import * as httpRequest from '../../util/HttpRequest'
import { base_host, file_host, record_host } from '../../config/Host'
import * as actionTypes from '../../actionTypes'
import { ObjectToUrl } from '../../util/util'
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import { Alert, Linking } from 'react-native'


export const getCarInfo = req => async (dispatch, getState) => {
    try {
        // console.log('req', req)
        const { loginReducer: { data: { user: { uid } } } } = getState()
        // console.log(' getState()', getState())
        // console.log('user', user)
        const url = `${base_host}/user/${uid}/car?carId=${req.carId}`
        // console.log('url', url)
        const res = await httpRequest.get(url)
        // console.log('res', res)
        if (res.success) {
            dispatch({ type: actionTypes.makePDF.get_carInfoForMakePdf_success, payload: { carInfo: res.result[0] ? res.result[0] : {} } })
        } else {
            dispatch({ type: actionTypes.makePDF.get_carInfoForMakePdf_failed, payload: { failedMsg: `${res.msg}` } })
        }
    } catch (err) {
        // console.log('err', err)
        dispatch({ type: actionTypes.makePDF.get_carInfoForMakePdf_error, payload: { errorMsg: `${err}` } })
    }
}

export const getCarInfoWaiting = () => (dispatch) => {
    dispatch({ type: actionTypes.makePDF.get_carInfoForMakePdf_waiting, payload: {} })
}

export const createPDF = (html, fileName) => async (dispatch) => {
    try {
        dispatch({ type: actionTypes.makePDF.create_PDF_waiting, payload: {} })
        const file = await RNHTMLtoPDF.convert({
            html: html,
            fileName,
            directory: 'Download',
        })
        // console.log('file', file)
        if (file && file.filePath) {
            Alert.alert(
                '提示',
                `文件已生成完毕！已保存到file://${file.filePath}，是否打开？`,
                [
                    { text: '关闭', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    {
                        text: '确定', onPress: () => {
                            Linking.openURL(`file://${file.filePath}`)
                        }
                    },
                ],
                { cancelable: false }
            )
            dispatch({ type: actionTypes.makePDF.create_PDF_success, payload: { filePath: file.filePath } })
        } else {
            dispatch({ type: actionTypes.makePDF.create_PDF_failed, payload: { failedMsg: '生成文件错误！' } })
        }
    } catch (err) {
        dispatch({ type: actionTypes.makePDF.create_PDF_error, payload: { errorMsg: `${err}` } })
    }

    // console.log(file)
}
