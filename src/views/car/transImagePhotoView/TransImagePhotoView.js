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

const TransImagePhotoView = props => {
    const { carImageReducer: { data: { transImageList, transImageIndex } }, setTransImageIndexForCarInfoImage } = props
    return (
        <SharePhotoView
            initParam={{ imageUrlList: transImageList.map(item => `${file_host}/image/${item.url}`), index: transImageIndex }}
            onIndexChanged={(index) => setTransImageIndexForCarInfoImage({ index })} />
    )
}

const mapStateToProps = (state) => ({
    carImageReducer: state.carImageReducer
})

const mapDispatchToProps = (dispatch) => ({
    setTransImageIndexForCarInfoImage: param => {
        dispatch(actions.carImage.setTransImageIndexForCarInfoImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TransImagePhotoView)