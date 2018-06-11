import React, { Component } from 'react'
import {
    Text,
    View,
    Dimensions,
    StatusBar,
} from 'react-native'
import { Button, Icon } from 'native-base'
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
import { Actions } from 'react-native-router-flux'
import { file_host } from '../../config/Host'


const { width, height } = Dimensions.get('window')

export default class SharePhotoView extends Component {
    constructor(props) {
        super(props)
        this.renderPagination = this.renderPagination.bind(this)
        this.renderPhoteView = this.renderPhoteView.bind(this)
    }

    static defaultProps = {
        onIndexChanged: (index) => { }
    }

    renderPagination(index, total, context) {
        return (
            <View style={{
                flex: 1,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                bottom: StatusBar.currentHeight + 24,
                left: 0,
                right: 0
            }}>
                <View style={{
                    borderRadius: 7,
                    backgroundColor: 'rgba(255,255,255,0.15)',
                    padding: 3,
                    paddingHorizontal: 7
                }}>
                    <Text style={{
                        color: '#fff',
                        fontSize: 14
                    }}>{(index + 1).toString()} / {total.toString()}</Text>
                </View>
            </View>
        )
    }

    renderPhoteView() {
        const { initParam } = this.props
        return initParam.imageUrlList.map((item, i) => {
            return <View key={i} style={{ flex: 1 }} >
                <PhotoView
                    source={{ uri: `${item}` }}
                    resizeMode='contain'
                    minimumZoomScale={1}
                    maximumZoomScale={3}
                    androidScaleType='fitCenter'
                    style={styles.photo}
                />
            </View>
        })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#000' }}>
                <Swiper
                    ref='Swiper'
                    index={this.props.initParam.index}
                    style={styles.wrapper}
                    renderPagination={this.renderPagination}
                    loop={false}
                    onIndexChanged={this.props.onIndexChanged}
                    automaticallyAdjustContentInsets={true}
                >
                    {this.renderPhoteView()}
                </Swiper>
            </View>
        )
    }
}

var styles = {
    wrapper: {
        backgroundColor: '#000',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        // width:600,
        // height,
        flex: 1
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
}