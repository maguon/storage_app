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
import { file_host } from '../../../config/Host'
import SharePhotoView from '../../../components/share/SharePhotoView'
import * as actions from '../../../actions'

const PhotoViewForCreateCar = props => {
    const { carImageReducer: { data: { imageList, index } }, setIndexForCarInfoImage } = props
    return (
        <SharePhotoView
            initParam={{ imageUrlList: imageList.map(item => `${file_host}/image/${item.url}`), index }}
            onIndexChanged={(index) => setIndexForCarInfoImage({ index })} />
    )
}

const mapStateToProps = (state) => ({
    carImageReducer: state.carImageReducer
})

const mapDispatchToProps = (dispatch) => ({
    setIndexForCarInfoImage: param => {
        dispatch(actions.carImage.setIndexForCarInfoImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PhotoViewForCreateCar)