import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, StyleSheet, Image, Alert, Modal, TouchableHighlight } from 'react-native'
import { Button, Icon, Spinner } from 'native-base'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
import CarCameraItem from './CarCameraItem'

const window = Dimensions.get('window')
let ImageWidth = (window.width - 50) / 2
let ImageHeight = ImageWidth / 16 * 9

var photoOptions = {
    //底部弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: null,
    customButtons: [{ title: '选择照片（一次最多5张）', name: 'choosePhoto' }],
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    maxWidth: 960,
    maxHeight: 960,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}

export default class CarCamera extends Component {
    constructor(props) {
        super(props)
        this.openPicker = this.openPicker.bind(this)
        this.launchCamera = this.launchCamera.bind(this)
        this.state = { modalVisible: false }
    }

    launchCamera = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            if (response.didCancel) {
                console.log('User cancelled video picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                if (response.customButton == 'choosePhoto') {
                    this.openPicker()
                }
            } else {
                ImageResizer.createResizedImage(response.uri, 960, 960, 'JPEG', 100)
                    .then((resizedImageUri) => {
                        let param = {
                            postFileParam: {
                                imageUrl: resizedImageUri,
                                imageType: response.type,
                                imageName: response.fileName
                            }
                        }
                        console.log(resizedImageUri)

                        // this.props.postImage(param)
                    }).catch((err) => {
                        return console.log(err)
                    })
            }
        })
    }



    openPicker() {

        ImageCropPicker.openPicker({
            multiple: true
        }).then(images => {
            if (images.length > 5) {
                this.setState({ modalVisible: true })
            }
            else {
                images.forEach((item) => {
                    let pos = item.path.lastIndexOf('/')
                    let param = {
                        postFileParam: {
                            imageUrl: item.path,
                            imageType: item.mime,
                            imageName: item.path.substring(pos + 1)
                        }
                    }
                    this.props.postImage(param)
                })
            }

        }).catch(err => {
            console.log('err')
        })
    }


    render() {
        let i = 1
        let images = this.props.images.map(item => {
            let image = (
                <CarCameraItem key={i} imgIndex={i} uri={item} showImagePage={this.props.showImagePage} />
            )
            i = i + 1
            return image
        })
        let btn
        if (i == 1) {
            btn = (<View style={[styles.item, { marginRight: 10, flexDirection: 'row', backgroundColor: '#ffffff' }]}>

                <Button
                    style={{
                        borderRadius: 35,
                        width: 70,
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00cade',
                        alignSelf: 'center'
                    }}
                    onPress={this.launchCamera}
                    title='上传照片' >
                    <Icon name='camera' />
                </Button>
            </View>)
        }
        else if (i % 2 == 1) {
            btn = (<View style={[styles.item, { marginRight: 10, flexDirection: 'row', backgroundColor: '#ffffff' }]}>

                <Button
                    style={{
                        borderRadius: 35,
                        width: 70,
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00cade',
                        alignSelf: 'center'
                    }}
                    onPress={this.launchCamera}
                    title='上传照片' >
                    <Icon name='camera' />
                </Button>
            </View>)
        } else {
            btn = (<View style={[styles.item, { flexDirection: 'row', backgroundColor: '#ffffff' }]}>
                <Button
                    style={{
                        borderRadius: 35,
                        width: 70,
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00cade',
                        alignSelf: 'center'
                    }}
                    onPress={this.launchCamera}
                    title='上传照片' >
                    <Icon name='camera' />
                </Button>
            </View>)
        }
        return (
            <View style={styles.container}>

                {images}

                {btn}
                <View>
                    <Modal
                        animationType={"fade"}
                        transparent={true}
                        visible={this.state.modalVisible}
                    >
                        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }} >
                            <View style={{ width: window.width - 60, height: 200, backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 10 }}>
                                <View style={{ flex: 1 }}><Text style={{ fontSize: 20, color: '#00cade' }}>提示</Text></View>
                                <View style={{ flex: 2 }}><Text style={{ fontSize: 20 }}>        您选择的图片数量已经超过5张，请重新选择!</Text></View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 20, color: '#00cade' }} onPress={() => { this.setState({ modalVisible: false }) }}>确认</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </View>
            </View >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        marginHorizontal: 20
    },
    item: {
        width: ImageWidth,
        height: ImageHeight,
        backgroundColor: '#cccccc',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})



