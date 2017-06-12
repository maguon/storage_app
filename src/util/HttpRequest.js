import * as appJson from '../android_app.json'
import requestHeaders from './RequestHeaders'


function get(url, callback) {
    // console.log('formHeaders',requestHeaders.formHeaders)
    // console.log('headers',requestHeaders.headers)
    fetch(url, {
        method: 'GET',
        headers: requestHeaders.headers
    }).then((response) => {
        let json = response.json()
        return json
    }
        ).then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        })
}

function post(url, params, callback) {
    fetch(url, {
        method: 'POST',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        });
}

function put(url, params, callback) {
    fetch(url, {
        method: 'PUT',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        });
}

function del(url,callback) {
    fetch(url, {
        method: 'DELETE',
        headers: requestHeaders.headers,
        //body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        });
}


function postFile(url, params, callback) {
    let formData = new FormData()
    // console.log('params', params)
    let file = { uri: params.imageUrl, type: params.imageType, name: params.imageName }
    formData.append(params.key, file)
    //console.log('formData', formData)
    fetch(url, {
        method: 'POST',
        headers: requestHeaders.formHeaders,
        body: formData,
    }).then((response) => response.json())
        .then((responseJson) => {
            //console.log('responseJson', responseJson)
            callback(null, responseJson)

        })
        .catch((error) => {
            //console.log('error', error)
            callback(error, null)
        })
}

module.exports = {
    get: get,
    post: post,
    put: put,
    del: del,
    postFile: postFile,
    getAll: getAll
}

// function postFile(imgAry, url, item, callback) {
//     let formData = new FormData()       //因为需要上传多张图片,所以需要遍历数组,把图片的路径数组放入formData中
//     if (Array.isArray(imgAry)) {
//         for (var i = 0; i < imgAry.length; i++) {
//             let file = { uri: imgAry[i], type: item.type, name: item.imageName }   //这里的key(uri和type和name)不能改变,
//             formData.append(item.key, file)
//         }
//     } else {
//         let file = { uri: item.imageUrl, type: item.type, name: item.imageName }   //这里的key(uri和type和name)不能改变,
//         console.log(file)
//         formData.append(item.key, file)
//         console.log(formData)
//     }

//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//         body: formData,
//     })
//         .then((response) => response.text())
//         .then((responseJson) => {
//             callback(null, responseJson)

//         })
//         .catch((error) => {
//             console.error('error', error)
//         })
// }

function getAll(urls, callback) {
    let proMises = urls.map(url => fetch(url, {
        method: 'GET',
        headers: requestHeaders.headers
    }))
    Promise.all(proMises)
        .then(response => response.map(item => item.json()))
        .then(responseJson => {
            Promise.all(responseJson)
                .then(res => {
                    callback(null, res)
                })
                .catch((error) => {
                    callback(error, null)
                })
        })
        .catch((error) => {
            callback(error, null)
        })
}

