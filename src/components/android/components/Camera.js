import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker'; //第三方相机
var photoOptions = {
    //底部弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
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

import { postFile } from '../../../util/HttpRequest'
import { base_host, file_host } from '../../../config/Host'
import ImageResizer from 'react-native-image-resizer'

export default class Camera extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.openMycamera()}>
                    <Text style={styles.welcome}>
                        相机&相册
                    </Text>
                </TouchableOpacity>
                <Button
                    onPress={this.testing}
                    title="相机测试"
                    color="#841584"
                />
                <Button
                    onPress={this.cameratest}
                    title="拍照测试"
                    color="#841584"
                />
                {/*<Image
                    style={styles.cameraImage}
                    source={{ uri: 'http://stg.myxxjs.com:9002/api/user/34/image/5900067ee187d33973181ec0' }} />*/}
            </View>
        );
    }


    openMycamera = () => {
        ImagePicker.showImagePicker(photoOptions, (image) => {
            console.log('response' + image);
            console.log(image);
            let sizeMax = 960  //960
            if (image.width > sizeMax && image.height > sizeMax) {
                if (image.width > image.height) {

                    image.width = image.width / (image.height / sizeMax)
                    console.log(image.height / sizeMax)
                    image.height = sizeMax


                }
                else {

                    image.height = Math.round(image.height / (image.width / sizeMax))
                    console.log(image.width / sizeMax)
                    image.width = sizeMax

                }
            }
            ImageResizer.createResizedImage(image.uri, image.width, image.height, 'JPEG', 80)
                .then((resizedImageUri) => {
                    console.log(resizedImageUri)
                    // this.setState({
                    //     resizedImageUri,
                    // });
                    let item = {
                        userId: 34,
                        imageType: 1,
                        type: "image/jpeg",
                        imageName: "image-f65db5f8-d000-4c0e-9894-c7b78b4fb6f8.jpg",
                        imageUrl: resizedImageUri,
                        key: "image"
                    }
                    let url = `${file_host}user/${item.userId}/image?imageType=${item.imageType}`
                    console.log(url)
                    postFile(item.imageUrl, url, item)
                    console.log('testUpload')
                }).catch((err) => {
                    return console.log(err);
                    // Alert.alert('Unable to resize the photo',
                    // 'Check the console for full the error message');
                });
            console.log(image)

            if (image.didCancel) {
                return
            }

        })
    }

    testing = () => {
        // console.log(ImageResizer)
        ImageResizer.createResizedImage('file:///storage/emulated/0/Android/data/com.storage_app/files/Pictures/image-f65db5f8-d000-4c0e-9894-c7b78b4fb6f8.jpg', 40, 40, 'JPEG', 80)
            .then((resizedImageUri) => {
                console.log(resizedImageUri)
                // this.setState({
                //     resizedImageUri,
                // });
                let item = {
                    userId: 34,
                    imageType: 1,
                    type: "image/jpeg",
                    imageName: "image-f65db5f8-d000-4c0e-9894-c7b78b4fb6f8.jpg",
                    imageUrl: resizedImageUri,
                    key: "image"
                }
                let url = `${file_host}user/${item.userId}/image?imageType=${item.imageType}`
                console.log(url)
                postFile(item.imageUrl, url, item)
                console.log('testUpload')
            }).catch((err) => {
                return console.log(err);
                // Alert.alert('Unable to resize the photo',
                // 'Check the console for full the error message');
            });

    }


    cameratest = () => {
        var options = {
            storageOptions: {
                skipBackup: true
            }
        };
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled video picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
        })
    }
}

const styles = StyleSheet.create({
    cameraImage: {
        width: 960,
        height: 960,
    },
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});


