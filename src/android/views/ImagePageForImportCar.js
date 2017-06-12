import React, { Component } from 'react'
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar
} from 'react-native'
import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { file_host } from '../../config/Host'
import * as ImportCarCameraAction from '../../actions/ImportCarCameraAction'

const { width, height } = Dimensions.get('window')

class ImagePage extends Component {
  constructor(props) {
    super(props)
    this.renderPagination = this.renderPagination.bind(this)
    this.renderPhoteView = this.renderPhoteView.bind(this)
    this.delImage = this.delImage.bind(this)
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
          backgroundColor: 'rgba(255,255,255,.15)',
          padding: 3,
          paddingHorizontal: 7
        }}>
          <Text style={{
            color: '#fff',
            fontSize: 14
          }}>{index + 1} / {total}</Text>
        </View>
      </View>
    )
  }

  renderPhoteView() {
    let { imageList } = this.props.ImportCarCameraReducer.importCarImage.data
    return imageList.map((item, i) => {
      return <View key={i} style={styles.slide}>
        <PhotoView
          source={{ uri: item }}
          resizeMode='contain'
          minimumZoomScale={0.5}
          maximumZoomScale={4}
          androidScaleType='center'
          style={styles.photo}
        />
      </View>
    })
  }

  delImage() {

    let { userId } = this.props.user
    let { recordId, imageList } = this.props.ImportCarCameraReducer.importCarImage.data
    let str = file_host + 'image/'
    let url = imageList[this.refs['Swiper'].state.index].replace(str, "")
    let param = {
      requiredParam: {
        userId,
        recordId,
        url
      }
    }
    
    this.props.delImage(param)
  }

  render() {
    let { index } = this.props
    let { recordId, imageList } = this.props.ImportCarCameraReducer.importCarImage.data
    console.log('recordId',recordId)
    console.log('imageList',imageList)
    return (
      <View style={{ position: 'relative', backgroundColor: '#000' }}>
        <Swiper
          ref='Swiper'
          index={index}
          style={styles.wrapper}
          renderPagination={this.renderPagination}
          loop={false}

        >
          {this.renderPhoteView()}
        </Swiper>
        <View style={{ position: 'absolute', top: 0, backgroundColor: 'rgba(255,255,255,0.1)', height: 40, width: width, flexDirection: 'row' }}>
          <Button iconLeft transparent style={{ position: 'absolute', left: 0, }}
            onPress={Actions.pop}>
            <Icon style={{ color: '#888888' }} name='arrow-back' />
            <Text style={{ color: '#888888' }}>返回</Text>
          </Button>
          <Button iconLeft transparent style={{ position: 'absolute', right: 0, }}
            onPress={this.delImage}
          >
            <Icon style={{ color: '#888888' }} name='ios-trash' />
            <Text style={{ color: '#888888' }}>删除</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ImportCarCameraReducer: state.ImportCarCameraReducer,
    user: state.LoginReducer.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  delImage: (param) => {
    dispatch(ImportCarCameraAction.delImage(param))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage)


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
    width,
    height,
    flex: 1
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
}
