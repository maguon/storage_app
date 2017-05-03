import * as appJson from '../android_app.json';
function get(url, callback) {
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        }
    }).then((response) => {
        let json = response.json()
        return json
    }
        ).then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        });
}

function post(url, params, callback) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        },
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
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        },
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        });
}

function del() {
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        },
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null, responseJson)
        })
        .catch((error) => {
            callback(error, null);
        });
}

function postFile(imgAry, url, item) {
    //`${url}${item.userId}/image?imageType=${item.imageType}`
    let formData = new FormData();       //因为需要上传多张图片,所以需要遍历数组,把图片的路径数组放入formData中
    if (Array.isArray(imgAry)) {
        for (var i = 0; i < imgAry.length; i++) {
            let file = { uri: imgAry[i], type: item.type, name: item.imageName };   //这里的key(uri和type和name)不能改变,
            formData.append(item.key, file);
        }
    } else {
        let file = { uri: item.imageUrl, type: item.type, name: item.imageName };   //这里的key(uri和type和name)不能改变,
        console.log(file);
        formData.append(item.key, file);
        console.log(formData);
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    })
        .then((response) => response.text())
        .then((responseData) => {

            console.log('responseData', responseData);
        })
        .catch((error) => { console.error('error', error) });
}

function getAll(urls, callback) {
    let proMises = urls.map(url => fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        }
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

module.exports = {
    get: get,
    post: post,
    put: put,
    del: del,
    postFile: postFile,
    getAll: getAll
}