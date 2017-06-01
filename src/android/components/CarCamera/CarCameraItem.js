import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Image } from 'react-native'
import { Button, Icon, Spinner } from 'native-base'

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
        let { imgIndex, uri } = this.props
        let image
        if (imgIndex % 2 == 1) {
            image = (<View style={[{ marginRight: 10, }, styles.item]}>
                <Image source={{ uri: uri }}
                    style={{ width: ImageWidth, height: ImageHeight }}
                    onLoadStart={() => { this.setState({ spinnerDisplay: true }) }}
                    onLoad={() => { this.setState({ spinnerDisplay: false }) }}
                    onLoadEnd={() => { this.setState({ spinnerDisplay: false }) }}
                />
                <Spinner color='#00cade' animating={this.state.spinnerDisplay} style={{ position: 'absolute' }} />
            </View>)
        }
        else {
            image = (<View style={styles.item}>
                <Image source={{ uri: uri }}
                    style={{ width: ImageWidth, height: ImageHeight }}
                    onLoadStart={() => { this.setState({ spinnerDisplay: true }) }}
                    onLoad={() => { this.setState({ spinnerDisplay: false }) }}
                    onLoadEnd={() => { this.setState({ spinnerDisplay: false }) }}
                />
                <Spinner color='#00cade' animating={this.state.spinnerDisplay} style={{ position: 'absolute' }} />
            </View>)
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


