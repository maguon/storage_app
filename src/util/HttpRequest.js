import * as appJson from '../android_app.json';
function get(url,callback){
    fetch( url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'charset':'utf-8'
        }
    }).then((response) =>
        response.json()
    ).then((responseJson) => {
            callback(null,responseJson)
        })
        .catch((error) => {
            callback(error,null);
        });
}

function post(url,params,callback){
    fetch( url,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'charset':'utf-8'
        },
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null,responseJson)
        })
        .catch((error) => {
            callback(error,null);
        });
}

function put(url,params,callback){
    fetch( url,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'charset':'utf-8'
        },
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null,responseJson)
        })
        .catch((error) => {
            callback(error,null);
        });
}

function del(){
    fetch( url,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'charset':'utf-8'
        },
        body: JSON.stringify(params)
    }).then((response) => response.json())
        .then((responseJson) => {
            callback(null,responseJson)
        })
        .catch((error) => {
            callback(error,null);
        });
}

module.exports={
    get : get ,
    post : post,
    put : put,
    del : del
}