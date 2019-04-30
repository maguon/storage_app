import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    ActivityIndicator
} from 'react-native'
import { Container, Spinner } from 'native-base'
import { file_host } from '../../../config/Host'
import CameraButton from '../../../components/share/CameraButton'
import ImageItem from '../../../components/share/ImageItem'
import { connect } from 'react-redux'
import globalStyles, { styleColor } from '../../../util/GlobalStyles'
import * as actions from '../../../actions'
import * as routerDirection from '../../../util/RouterDirection'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9


const renderVideo = props => {
    const { videoUrl, uploadCarVideo, carId, vin } = props
    if (videoUrl) {
        return (
            <TouchableOpacity style={styles.itemCameraButton} onPress={Actions.carImageVideoView}>
                <FontAwesomeIcon name='film' style={{ fontSize: 50, color: styleColor }} />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={styles.itemCameraButton} onPress={() => Actions.pictureRecording({ uploadCarVideo: param => uploadCarVideo({ ...param, carId, vin }) })}>
                <FontAwesomeIcon name='video-camera' style={{ fontSize: 50, color: styleColor }} />
            </TouchableOpacity>
        )
    }
}


const CarImage = props => {
    const { parent,
        uploadCarImageWaiting,
        uploadCarImage,
        uploadCarVideo,
        uploadCarVideoWaiting,
        carImageReducer: { data: { imageList, videoUrl, carImageList,
            storageImageList,
            transImageList, }, getImageListForCarInfo, updateCarImage },
        carImageReducer,
        initParam: { carId, vin }
    } = props
    if (getImageListForCarInfo.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container >
                <View style={{ margin: 5 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ margin: 5, width: containerWidth - 15, height: (containerWidth - 15) / 16 * 9 }}
                            onPress={() => { Actions.carImageStorage({ initParam: { carId, vin } }) }}>
                            <View>
                                {carImageList.length > 0 && <ImageItem imageUrl={`${file_host}/image/${carImageList[0].url}`} />}
                                {carImageList.length == 0 && <View style={{ width: containerWidth - 15, height: (containerWidth - 15) / 16 * 9, borderColor: '#ccc', borderWidth: 0.5 }} />}
                            </View>
                            <View style={{ position: 'absolute', bottom: 0 }}>
                                <Text style={[globalStyles.midText, { backgroundColor: 'rgba(0, 0, 0, 0.1)', width: containerWidth - 15, textAlign: 'center' }]}>车辆相册({`${carImageList.length}`})</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { Actions.storageImageStorage({ initParam: { carId, vin } }) }}
                            style={{ margin: 5, width: containerWidth - 15, height: (containerWidth - 15) / 16 * 9 }}>
                            <View>
                                {storageImageList.length > 0 && <ImageItem imageUrl={`${file_host}/image/${storageImageList[0].url}`} />}
                                {storageImageList.length == 0 && <View style={{ width: containerWidth - 15, height: (containerWidth - 15) / 16 * 9, borderColor: '#ccc', borderWidth: 0.5 }} />}
                            </View>
                            <View style={{ position: 'absolute', bottom: 0 }}>
                                <Text style={[globalStyles.midText, { backgroundColor: 'rgba(0, 0, 0, 0.1)', width: containerWidth - 15, textAlign: 'center' }]}>仓储相册({`${storageImageList.length}`})</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => { Actions.transImageStorage({ initParam: { carId, vin } }) }}
                            style={{ margin: 5, width: containerWidth - 15, height: (containerWidth - 15) / 16 * 9 }}>
                            <View>
                                {transImageList.length > 0 && <ImageItem imageUrl={`${file_host}/image/${transImageList[0].url}`} />}
                                {transImageList.length == 0 && <View style={{ width: containerWidth - 15, height: (containerWidth - 15) / 16 * 9, borderColor: '#ccc', borderWidth: 0.5 }} />}
                            </View>
                            <View style={{ position: 'absolute', bottom: 0 }}>
                                <Text style={[globalStyles.midText, { backgroundColor: 'rgba(0, 0, 0, 0.1)', width: containerWidth - 15, textAlign: 'center' }]}>航运相册({`${transImageList.length}`})</Text>
                            </View>
                        </TouchableOpacity>
                        {videoUrl && <TouchableOpacity style={styles.itemCameraButton} onPress={Actions.carImageVideoView}>
                            <FontAwesomeIcon name='film' style={{ fontSize: 50, color: styleColor }} />
                        </TouchableOpacity>}
                        {!videoUrl && <TouchableOpacity style={styles.itemCameraButton} onPress={() => Actions.pictureRecording({ uploadCarVideo: param => uploadCarVideo({ ...param, carId, vin }) })}>
                            <FontAwesomeIcon name='video-camera' style={{ fontSize: 50, color: styleColor }} />
                        </TouchableOpacity>}
                    </View>
                </View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={carImageReducer.uploadCarVideo.isResultStatus == 1}
                    onRequestClose={() => { }}>
                    <View style={styles.modalContainer} >
                        <View style={styles.modalItem}>
                            <ActivityIndicator
                                animating={carImageReducer.uploadCarVideo.isResultStatus == 1}
                                style={styles.modalActivityIndicator}
                                size="large"
                            />
                            <Text style={styles.modalText}>正在上传视频...</Text>
                        </View>
                    </View>
                </Modal>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    cameraButtonContainer: {
        marginTop: 50
    },
    subtitleContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    titleContainer: {
        marginTop: 40,
        alignItems: 'center'
    },
    tagText: {
        color: 'red'
    },
    itemContainer: {
        margin: 5
    },
    listEmptyContainer: {
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatList: {
        padding: 5
    },
    itemCameraButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: containerWidth,
        height: containerHeight
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalActivityIndicator: {
        height: 40
    },
    modalText: {
        color: '#fff',
        paddingLeft: 10
    }
})


const mapStateToProps = (state) => ({
    carImageReducer: state.carImageReducer
})


const mapDispatchToProps = (dispatch) => ({
    uploadCarImageWaiting: () => {
        dispatch(actions.carImage.uploadCarImageWaiting())
    },
    uploadCarImage: param => {
        dispatch(actions.carImage.uploadCarImage(param))
    },
    uploadCarVideoWaiting: () => {
        dispatch(actions.carImage.uploadCarVideoWaiting())
    },
    uploadCarVideo: (param) => {
        dispatch(actions.carImage.uploadCarVideo(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarImage)

