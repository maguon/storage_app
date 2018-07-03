import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
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

const renderItem = props => {
    const { item, index, uploadCarImageWaiting, uploadCarImage, imageList, parent, carId, vin, setIndexForCarInfoImage, videoUrl, uploadCarVideo, uploadCarVideoWaiting } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadCarImageWaiting, uploadCarImage, carId, vin, uploadCarVideo, uploadCarVideoWaiting })
    } else if (item == 'isVideo') {
        return renderVideo({ videoUrl, uploadCarVideo, carId, vin })
    } else {
        return (
            <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => {
                    setIndexForCarInfoImage({ index })
                    routerDirection.carImagePhotoView(parent)({ initParam: { imageUrlList: imageList.map(url => `${file_host}/image/${url.url}`), index } })
                }} >
                <ImageItem imageUrl={`${file_host}/image/${item.url}`} />
            </TouchableOpacity>
        )
    }
}

const renderVideo = props => {
    const { videoUrl, uploadCarVideo, carId, vin } = props
    if (videoUrl) {
        return (
            <TouchableOpacity style={styles.itemCameraButton} onPress={Actions.carImageVideoView}>
                <FontAwesomeIcon name='film' style={{ fontSize: 50, color: styleColor  }} />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={styles.itemCameraButton} onPress={() => Actions.pictureRecording({ uploadCarVideo: param => uploadCarVideo({ ...param, carId, vin }) })}>
                <FontAwesomeIcon name='video-camera' style={{ fontSize: 50, color: styleColor  }} />
            </TouchableOpacity>
        )
    }
}

const renderItemCameraButton = props => {
    const { index, uploadCarImageWaiting, uploadCarImage, carId, vin, uploadCarVideoWaiting, uploadCarVideo } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={(cameraReses) => uploadCarImage({ cameraReses, carId, vin })}
                getVideo={param => uploadCarVideo({ ...param, carId, vin })}
                _cameraStart={uploadCarImageWaiting}
                _videoStart={uploadCarVideoWaiting}
            />
        </View>
    )
}

const renderListEmpty = props => {
    const { uploadCarImageWaiting, uploadCarImage, carId, vin, uploadCarVideo, uploadCarVideoWaiting } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={(cameraReses) => uploadCarImage({ cameraReses, carId, vin })}
                    getVideo={param => uploadCarVideo({ ...param, carId, vin })}
                    _cameraStart={uploadCarImageWaiting}
                    _videoStart={uploadCarVideoWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>点击按钮上传车辆图片或视频</Text>
            </View>
        </View>
    )
}

const CarImage = props => {
    const { parent,
        uploadCarImageWaiting,
        uploadCarImage,
        uploadCarVideo,
        uploadCarVideoWaiting,
        setIndexForCarInfoImage,
        carImageReducer: { data: { imageList, videoUrl }, getImageListForCarInfo, updateCarImage },
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
                <FlatList
                    keyExtractor={(item, index) => index}
                    style={styles.flatList}
                    data={imageList.length > 0 || videoUrl ? ['isCameraButton', 'isVideo', ...imageList] : imageList}
                    numColumns={2}
                    ListEmptyComponent={() => renderListEmpty({ uploadCarImageWaiting, uploadCarImage, carId, vin, uploadCarVideo, uploadCarVideoWaiting })}
                    renderItem={({ item, index }) => renderItem({ parent, item, index, uploadCarVideo, uploadCarVideoWaiting, imageList, uploadCarImageWaiting, uploadCarImage, carId, vin, setIndexForCarInfoImage, videoUrl })} />
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={updateCarImage.isResultStatus == 1}
                    onRequestClose={() => { }}>
                    <View style={styles.modalContainer} >
                        <View style={styles.modalItem}>
                            <ActivityIndicator
                                animating={updateCarImage.isResultStatus == 1}
                                style={styles.modalActivityIndicator}
                                size="large"
                            />
                            <Text style={styles.modalText}>正在上传图片...</Text>
                        </View>
                    </View>
                </Modal>
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
    setIndexForCarInfoImage: param => {
        dispatch(actions.carImage.setIndexForCarInfoImage(param))
    },
    uploadCarVideoWaiting: () => {
        dispatch(actions.carImage.uploadCarVideoWaiting())
    },
    uploadCarVideo: (param) => {
        dispatch(actions.carImage.uploadCarVideo(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarImage)

