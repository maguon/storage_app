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
import { Container } from 'native-base'
import CameraButton from '../../components/share/CameraButton'
import globalStyles from '../../util/GlobalStyles'
import * as actions from '../../actions'
import ImageItem from '../../components/share/ImageItem'
import { file_host } from '../../config/Host'
import { Actions } from 'react-native-router-flux'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadCarImageWaiting, videoUrl, uploadCarImage, setIndexForUploadImageForCreateCar, uploadCarVideo } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadCarImageWaiting, uploadCarImage, uploadCarVideo })
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
    const { index, uploadCarImageWaiting, uploadCarImage, uploadCarVideo } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={param => uploadCarImage({ cameraReses: param })}
                getVideo={uploadCarVideo}
                _cameraStart={uploadCarImageWaiting}
            />
        </View>
    )
}

const renderVideo = props => {
    const { videoUrl, uploadCarVideo } = props
    if (videoUrl) {
        return (
            <TouchableOpacity style={styles.itemCameraButton} onPress={Actions.addImageForCreateCarVideoView}>
                <FontAwesomeIcon name='film' style={{ fontSize: 50 }} />
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity style={styles.itemCameraButton} onPress={() => Actions.pictureRecording({ uploadCarVideo })}>
                <FontAwesomeIcon name='video-camera' style={{ fontSize: 50 }} />
            </TouchableOpacity>
        )
    }

}

const renderListEmpty = props => {
    const { uploadCarImageWaiting, uploadCarImage, uploadCarVideo } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={param => uploadCarImage({ cameraReses: param })}
                    getVideo={uploadCarVideo}
                    _cameraStart={uploadCarImageWaiting} />
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
    const { parent, uploadCarImageWaiting, uploadCarImage, setIndexForUploadImageForCreateCar, uploadCarVideo,
        addImageForCreateCarReducer: { data: { imageList, videoUrl }, uploadCarImage: { isResultStatus } } } = props
    return (
        <Container >
            <FlatList
                style={styles.flatList}
                keyExtractor={(item, index) => index}
                data={imageList.length > 0 ? ['isCameraButton', 'isVideo', ...imageList] : imageList}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ uploadCarImageWaiting, uploadCarImage, uploadCarVideo })}
                renderItem={({ item, index }) => renderItem({ parent, item, index, videoUrl, imageList, uploadCarImageWaiting, uploadCarVideo, uploadCarImage, setIndexForUploadImageForCreateCar })} />
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
        </Container>
    )
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
    uploadCarVideo: (param) => {
        dispatch(actions.addImageForCreateCar.uploadCarVideo(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddImageForCreateCar)
