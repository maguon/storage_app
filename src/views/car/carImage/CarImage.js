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

const window = Dimensions.get('window')
const containerWidth = window.width / 2
const containerHeight = containerWidth / 16 * 9

const renderItem = props => {
    const { item, index, uploadCarImageWaiting, uploadCarImage, imageList, parent, carId, vin, setIndexForCarInfoImage } = props
    if (item == 'isCameraButton') {
        return renderItemCameraButton({ index, uploadCarImageWaiting, uploadCarImage, carId, vin })
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

const renderItemCameraButton = props => {
    const { index, uploadCarImageWaiting, uploadCarImage, carId, vin } = props
    return (
        <View key={index} style={styles.itemCameraButton}>
            <CameraButton
                getImage={(cameraReses) => uploadCarImage({ cameraReses, carId, vin })}
                _cameraStart={uploadCarImageWaiting}
            />
        </View>
    )
}

const renderListEmpty = props => {
    const { uploadCarImageWaiting, uploadCarImage, carId, vin } = props
    return (
        <View>
            <View style={styles.cameraButtonContainer}>
                <CameraButton
                    getImage={(cameraReses) => uploadCarImage({ cameraReses, carId, vin })}
                    _cameraStart={uploadCarImageWaiting} />
            </View>
            <View style={styles.titleContainer}>
                <Text style={[globalStyles.midText, globalStyles.styleColor]}>点击按钮上传车辆图片</Text>
            </View>
            {/* <View style={styles.subtitleContainer}>
                <Text style={[globalStyles.smallText, globalStyles.styleColor]}>若不进行此选项操作可直接点击“<Text style={styles.tagText}>完成</Text>”</Text>
            </View> */}
        </View>
    )
}

const CarImage = props => {
    const { parent,
        uploadCarImageWaiting,
        uploadCarImage,
        setIndexForCarInfoImage,
        carImageReducer: { data: { imageList }, getImageListForCarInfo, updateCarImage },
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
                    data={imageList.length > 0 ? [...imageList, 'isCameraButton'] : imageList}
                    numColumns={2}
                    ListEmptyComponent={() => renderListEmpty({ uploadCarImageWaiting, uploadCarImage, carId, vin })}
                    renderItem={({ item, index }) => renderItem({ parent, item, index, imageList, uploadCarImageWaiting, uploadCarImage, carId, vin, setIndexForCarInfoImage })} />
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


const mapStateToProps = (state, ownProps) => ({
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarImage)

