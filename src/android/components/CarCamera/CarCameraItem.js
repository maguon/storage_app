import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button, Icon, Spinner } from 'native-base'
import { Actions } from 'react-native-router-flux'

const window = Dimensions.get('window')
let ImageWidth = (window.width - 50) / 2
let ImageHeight = ImageWidth / 16 * 9

export default class CarCameraItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            spinnerDisplay: true
        }
    }

    render() {
        let { imgIndex, uri, showImagePage} = this.props
        let image
        if (imgIndex % 2 == 1) {
            image = (
                <TouchableOpacity onPress={() => { showImagePage({ index: imgIndex - 1 }) }}>
                    <View style={[{ marginRight: 10, }, styles.item]}>
                        <Image source={{ uri: uri }}
                            style={{ width: ImageWidth, height: ImageHeight }}
                            onLoadStart={() => { this.setState({ spinnerDisplay: true }) }}
                            onLoad={() => { this.setState({ spinnerDisplay: false }) }}
                            onLoadEnd={() => { this.setState({ spinnerDisplay: false }) }}
                        />
                        <Spinner color='#00cade' animating={this.state.spinnerDisplay} style={{ position: 'absolute' }} />
                    </View>
                </TouchableOpacity>)
        }
        else {
            image = (
                <TouchableOpacity onPress={() => { showImagePage({ index: imgIndex - 1, imgList: this.props.images }) }}>
                    <View style={styles.item}>
                        <Image source={{ uri: uri }}
                            style={{ width: ImageWidth, height: ImageHeight }}
                            onLoadStart={() => { this.setState({ spinnerDisplay: true }) }}
                            onLoad={() => { this.setState({ spinnerDisplay: false }) }}
                            onLoadEnd={() => { this.setState({ spinnerDisplay: false }) }}
                        />
                        <Spinner color='#00cade' animating={this.state.spinnerDisplay} style={{ position: 'absolute' }} />
                    </View>
                </TouchableOpacity>)
        }
        return image
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


