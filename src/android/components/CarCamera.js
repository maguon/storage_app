import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native'
import { Button, Icon } from 'native-base'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'

const window = Dimensions.get('window')
let ImageWidth = (window.width - 50) / 2
let ImageHeight = ImageWidth / 16 * 9



export default class CarCamera extends Component {
    constructor(props) {
        super(props)
    }

    launchCamera = () => {
        var options = {
            storageOptions: {
                skipBackup: true
            }
        }; ImagePicker.launchCamera(options, (response) => {


            if (response.didCancel) {
                console.log('User cancelled video picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {

            } else {
                console.log('Response = ', response)
                let param = {
                    postFileParam: {
                        imageUrl: response.uri,
                        imageType: response.type,
                        imageName: response.fileName
                    }
                }
                this.props.postImage(param)
                console.log('launchCamera', param)

            }
        })
    }
    render() {
        console.log('carcamera', this.props.images)
        let images = this.props.images.map(item => {
            return (<View key={item} style={[{ marginRight: 10, }, styles.item]}>
                <Image source={{ uri: item }}
                    style={{ width: ImageWidth, height: ImageHeight }} />
            </View>)
        }
        )
        return (
            <View style={styles.container}>
{images}
                {/*<View style={styles.item}>
                    <Text>图片</Text>
                </View>*/}
                <View style={[styles.item, { flexDirection: 'row', backgroundColor: '#ffffff' }]}>
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
                </View>
            </View>
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
        backgroundColor: '#999999',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

//export default CarCamera

