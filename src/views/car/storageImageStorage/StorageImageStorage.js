import React from 'react'
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
import { Container } from 'native-base'
import { file_host } from '../../../config/Host'
import CameraButton from '../../../components/share/CameraButton'
import ImageItem from '../../../components/share/ImageItem'
import { connect } from 'react-redux'
import globalStyles from '../../../util/GlobalStyles'
import * as actions from '../../../actions'
import { Actions } from 'react-native-router-flux'

const window = Dimensions.get('window')
const containerWidth = window.width / 2-15
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadStorageImageWaiting, uploadStorageImage, storageImageList, carId, vin, setStorageImageIndexForCarInfoImage } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadStorageImageWaiting, uploadStorageImage, carId, vin })
    } else {
        return (
            <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => {
                    setStorageImageIndexForCarInfoImage({ index })
                    Actions.storageImagePhotoView({ initParam: { imageUrlList: storageImageList.map(url => `${file_host}/image/${url.url}`), index } })
                }} >
                <ImageItem imageUrl={`${file_host}/image/${item.url}`} />
            </TouchableOpacity>
        )
    }
}


const renderItemCameraButton = props => {
    const { index, uploadStorageImageWaiting, uploadStorageImage, carId, vin } = props
    return (
        <View key={index} style={[styles.itemCameraButton,styles.itemContainer]}>
            <CameraButton
                getImage={(cameraReses) => uploadStorageImage({ cameraReses, carId, vin })}
                _cameraStart={uploadStorageImageWaiting}
            />
        </View>
    )
}

const renderListEmpty = props => {
    const { uploadStorageImageWaiting, uploadStorageImage, carId, vin } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={(cameraReses) => uploadStorageImage({ cameraReses, carId, vin })}
                    _cameraStart={uploadStorageImageWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>点击按钮上传仓储照片</Text>
            </View>
        </View>
    )
}

const StorageImageStorage = props => {
    const { parent,
        uploadStorageImageWaiting,
        uploadStorageImage,
        setStorageImageIndexForCarInfoImage,
        carImageReducer: { data: { storageImageList }, updateStorageImage },
        initParam: { carId, vin }
    } = props
    return (
        <Container>
            <FlatList
                keyExtractor={(item, index) => index}
                style={styles.flatList}
                data={storageImageList.length > 0 ? ['isCameraButton', ...storageImageList] : storageImageList}
                numColumns={2}
                ListEmptyComponent={() => renderListEmpty({ uploadStorageImageWaiting, uploadStorageImage, carId, vin })}
                renderItem={({ item, index }) => renderItem({ parent, item, index:index-1, storageImageList, uploadStorageImageWaiting, uploadStorageImage, carId, vin, setStorageImageIndexForCarInfoImage })} />
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={updateStorageImage.isResultStatus == 1}
                onRequestClose={() => { }}>
                <View style={styles.modalContainer} >
                    <View style={styles.modalItem}>
                        <ActivityIndicator
                            animating={updateStorageImage.isResultStatus == 1}
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


const mapStateToProps = (state) => ({
    carImageReducer: state.carImageReducer
})


const mapDispatchToProps = (dispatch) => ({
    uploadStorageImageWaiting: () => {
        dispatch(actions.carImage.uploadStorageImageWaiting())
    },
    uploadStorageImage: param => {
        dispatch(actions.carImage.uploadStorageImage(param))
    },
    setStorageImageIndexForCarInfoImage: param => {
        dispatch(actions.carImage.setStorageImageIndexForCarInfoImage(param))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(StorageImageStorage)