import { PixelRatio,Dimensions } from 'react-native'

export const fontSizeCoeff = Dimensions.get('window').width/360/ PixelRatio.getFontScale()

export const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

export const ObjectToUrl = (obj) => {
    let url = '?'
    for (key in obj) {
        if (obj[key] || obj[key] == 0) {
            url = url === '?' ? url : `${url}&`
            url = `${url}${key}=${obj[key]}`
        }
    }
    return url
}

export const objectExceptNull = (param) => {
    let obj = { ...param }
    for (key in obj) {
        if (!obj[key] && obj[key] != 0 && obj[key] != '') {
            delete obj[key]
        }
    }
    return obj
}
