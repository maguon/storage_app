const ObjectToUrl = (obj) => {
    let url = ''
    for (key in obj) {
        url = url === '' ? url : `${url}&`
        url = `${url}${key}=${obj[key]}`
    }
}

export default ObjectToUrl