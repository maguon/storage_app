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

const CarImagePhotoView = props => {
    const { carImageReducer: { data: { carImageList, carImageIndex } }, setCarImageIndexForCarInfoImage } = props
    return (
        <SharePhotoView
            initParam={{ imageUrlList: carImageList.map(item => `${file_host}/image/${item.url}`), index:carImageIndex }}
            onIndexChanged={(index) => setCarImageIndexForCarInfoImage({ index })} />
    )
}

const mapStateToProps = (state) => ({
    carImageReducer: state.carImageReducer
})

const mapDispatchToProps = (dispatch) => ({
    setCarImageIndexForCarInfoImage: param => {
        dispatch(actions.carImage.setCarImageIndexForCarInfoImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarImagePhotoView)