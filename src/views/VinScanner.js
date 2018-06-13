import React, { Component } from 'react'
import {
    AppRegistry,
    StyleSheet,
    Text,
    Vibration,
    View
} from 'react-native'
import BarcodeScanner from 'react-native-barcodescanner'
import { connect } from 'react-redux'
import { Container } from 'native-base'
import Orientation from 'react-native-orientation'

export default class VinScanner extends Component {
    constructor(props) {
        super(props)
        this.barcodeReceived = this.barcodeReceived.bind(this)
    }

    componentDidMount() {
        Orientation.lockToLandscape()
    }

    componentWillUnmount() {
        Orientation.lockToPortrait()
    }

    barcodeReceived(e) {
        Vibration.vibrate()
        console.log('e', e)
        this.props.barcodeReceived(e)
    }

    render() {
        return (
            <Container>
                <BarcodeScanner
                    viewFinderHeight={80}
                    viewFinderWidth={450}
                    onBarCodeRead={this.barcodeReceived}
                    style={{ flex: 1 }}
                    torchMode='back'
                    cameraType='off'
                />
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    statusBar: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBarText: {
        fontSize: 20,
    },
});