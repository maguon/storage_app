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
import * as CarInfoAction from '../../actions/CarInfoAction'
import ConfirmModal from '../components/ConfirmModal'

const { width, height } = Dimensions.get('window')

class ImagePage extends Component {
  constructor(props) {
    super(props)
    this.renderPagination = this.renderPagination.bind(this)
    this.renderPhoteView = this.renderPhoteView.bind(this)
    this.onPressOk = this.onPressOk.bind(this)
    this.onPressCancel = this.onPressCancel.bind(this)
    this.delImage = this.delImage.bind(this)
    this.state = {
      confirmModalVisible: false
    }
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
    let { imageList } = this.props.CarInfoReducer.getCarInfo.data
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

  onPressOk() {
    this.setState({ confirmModalVisible: false })
    let { userId } = this.props.user
    let { recordId, imageList } = this.props.CarInfoReducer.getCarInfo.data
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

  onPressCancel() {
    this.setState({ confirmModalVisible: false })
  }

  delImage() {
    this.setState({ confirmModalVisible: true })

  }

  render() {
    let { index } = this.props
    let { recordId, imageList } = this.props.CarInfoReducer.getCarInfo.data
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
        <ConfirmModal
          title='确认删除图片？'
          isVisible={this.state.confirmModalVisible}
          onPressOk={this.onPressOk}
          onPressCancel={this.onPressCancel} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    CarInfoReducer: state.CarInfoReducer,
    user: state.LoginReducer.user
  }
}

const mapDispatchToProps = (dispatch) => ({
  delImage: (param) => {
    dispatch(CarInfoAction.delImage(param))
  },
  resetDelImage: () => {
    dispatch(CarInfoAction.resetDelImage())
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
