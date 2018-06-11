import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    StatusBar,
} from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { file_host } from '../../config/Host'
import SharePhotoView from '../../components/share/SharePhotoView'
import * as actions from '../../actions'

const AddImageForCreateCarPhotoView = props => {
    const { addImageForCreateCarReducer: { data: { imageList, index } }, setIndexForUploadImageForCreateCar } = props
    return (
        <SharePhotoView
            initParam={{ imageUrlList: imageList.map(item => `${file_host}/image/${item}`), index }}
            onIndexChanged={(index) => setIndexForUploadImageForCreateCar({ index })} />
    )
}

const mapStateToProps = (state) => ({
    addImageForCreateCarReducer: state.addImageForCreateCarReducer
})

const mapDispatchToProps = (dispatch) => ({
    setIndexForUploadImageForCreateCar: param => {
        dispatch(actions.addImageForCreateCar.setIndexForUploadImageForCreateCar(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddImageForCreateCarPhotoView)