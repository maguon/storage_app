import requestHeaders from './RequestHeaders'

export const get = (url) => {
    return fetch(url, {
        method: 'GET',
        headers: requestHeaders.headers
    }).then((response) => response.json())
}

export const post = (url, params) => {
    return fetch(url, {
        method: 'POST',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
}

export const put = (url, params) => {
    return fetch(url, {
        method: 'PUT',
        headers: requestHeaders.headers,
        body: JSON.stringify(params)
    }).then((response) => response.json())
}

export const del = (url) => {
    return fetch(url, {
        method: 'DELETE',
        headers: requestHeaders.headers,
    }).then((response) => response.json())
}

export const postFile = (url, params) => {
    let formData = new FormData()
    let file = { uri: params.imageUrl, type: params.imageType, name: params.imageName }
    // formData.append(params.key, file)
    formData.append(params.key, file)

    return fetch(url, {
        method: 'POST',
        // headers: requestHeaders.formHeaders,
        body: formData,
    }).then((response) => response.json())
}

