import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    Modal,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { Container, Spinner } from 'native-base'
import CameraButton from '../../components/share/CameraButton'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
import * as actions from '../../actions'
import ImageItem from '../../components/share/ImageItem'
import { file_host } from '../../config/Host'
import { Actions } from 'react-native-router-flux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadCarImageWaiting, videoUrl, uploadCarImage, setIndexForUploadImageForCreateCar, uploadCarVideo, uploadCarVideoWaiting } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadCarImageWaiting, uploadCarImage, uploadCarVideo, uploadCarVideoWaiting })
    } else if (item == 'isVideo') {
        return renderVideo({ videoUrl, uploadCarVideo })
    } else {
        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => {
                    setIndexForUploadImageForCreateCar({ index })
                    Actions.addImageForCreateCarPhotoView()
                }} >
                <ImageItem imageUrl={`${file_host}/image/${item}`} />
            </TouchableOpacity>
        )
    }
}

const renderItemCameraButton = props => {
    const { index, uploadCarImageWaiting, uploadCarImage, uploadCarVideo, uploadCarVideoWaiting } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={param => uploadCarImage({ cameraReses: param })}
                getVideo={uploadCarVideo}
                _cameraStart={uploadCarImageWaiting}
                _videoStart={uploadCarVideoWaiting}
            />
        </View>
    )
}

const renderVideo = props => {
    const { videoUrl, uploadCarVideo } = props
    if (videoUrl) {
        return (
            <TouchableOpacity style={styles.itemCameraButton} onPress={Actions.addImageForCreateCarVideoView}>
                <FontAwesomeIcon name='film' style={{ fontSize: 50, color: styleColor }} />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={styles.itemCameraButton} onPress={() => Actions.pictureRecording({ uploadCarVideo })}>
                <FontAwesomeIcon name='video-camera' style={{ fontSize: 50, color: styleColor }} />
            </TouchableOpacity>
        )
    }
}

const renderListEmpty = props => {
    const { uploadCarImageWaiting, uploadCarImage, uploadCarVideo, uploadCarVideoWaiting } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={param => uploadCarImage({ cameraReses: param })}
                    getVideo={uploadCarVideo}
                    _cameraStart={uploadCarImageWaiting}
                    _videoStart={uploadCarVideoWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.largeText, globalStyles.styleColor]}>点击按钮上传车辆视频或照片</Text>
            </View>
            <View style={styles.subtitleContainer}>
                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>若不进行此选项操作可直接点击“<Text style={styles.tagText}>完成</Text>”</Text>
            </View>
        </View>
    )
}

const AddImageForCreateCar = props => {
    const { parent, uploadCarImageWaiting, uploadCarImage, setIndexForUploadImageForCreateCar, uploadCarVideo, uploadCarVideoWaiting,
        addImageForCreateCarReducer: { data: { imageList, videoUrl }, uploadCarImage: { isResultStatus }, getImageForCreateCar }, addImageForCreateCarReducer } = props
    if (getImageForCreateCar.isResultStatus == 1) {
        return (
            <Container>
                <Spinner color={styleColor} />
            </Container>
        )
    } else {
        return (
            <Container >
                <FlatList
                    style={styles.flatList}
                    keyExtractor={(item, index) => index}
                    data={imageList.length > 0 || videoUrl ? ['isCameraButton', 'isVideo', ...imageList] : imageList}
                    numColumns={2}
                    ListEmptyComponent={() => renderListEmpty({ uploadCarImageWaiting, uploadCarImage, uploadCarVideo, uploadCarVideoWaiting })}
                    renderItem={({ item, index }) => renderItem({
                        parent, item, index, videoUrl, imageList, uploadCarImageWaiting, uploadCarVideo,
                        uploadCarVideoWaiting, uploadCarImage, setIndexForUploadImageForCreateCar
                    })} />
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={isResultStatus == 1}
                    onRequestClose={() => { }}>
                    <View style={styles.modalContainer} >
                        <View style={styles.modalItem}>
                            <ActivityIndicator
                                animating={isResultStatus == 1}
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
                    visible={addImageForCreateCarReducer.uploadCarVideo.isResultStatus == 1}
                    onRequestClose={() => { }}>
                    <View style={styles.modalContainer} >
                        <View style={styles.modalItem}>
                            <ActivityIndicator
                                animating={addImageForCreateCarReducer.uploadCarVideo.isResultStatus == 1}
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

const mapStateToProps = (state) => {
    return {
        addImageForCreateCarReducer: state.addImageForCreateCarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    uploadCarImage: (param) => {
        dispatch(actions.addImageForCreateCar.uploadCarImage(param))
    },
    uploadCarImageWaiting: () => {
        dispatch(actions.addImageForCreateCar.uploadCarImageWaiting())
    },
    setIndexForUploadImageForCreateCar: param => {
        dispatch(actions.addImageForCreateCar.setIndexForUploadImageForCreateCar(param))
    },
    uploadCarVideoWaiting: () => {
        dispatch(actions.addImageForCreateCar.uploadCarVideoWaiting())
    },
    uploadCarVideo: (param) => {
        dispatch(actions.addImageForCreateCar.uploadCarVideo(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddImageForCreateCar)
