import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Button, Icon, Spinner } from 'native-base'
import globalStyles, { styleColor } from '../../util/GlobalStyles'
const window = Dimensions.get('window')

const containerWidth = (window.width - (2 + 1) * 10) / 2
const containerHeight = containerWidth / 16 * 9
const styles = StyleSheet.create({
    spinner: {
        position: 'absolute',
        alignSelf: 'center'
    },
    container: {
        borderColor: '#ccc',
        justifyContent: 'center',
        borderWidth: 0.3,
        width: containerWidth,
        height: containerHeight
    },
    image: {
        flex: 1
    }
})

export default class ImageItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            spinnerDisplay: true
        }
    }

    static defaultProps = {
        imageUrl: 'http://stg.myxxjs.com:9002/api/image/59fa839a100f67405a123c23', //图片地址
    }


    render() {
        return <View style={styles.container}>
            <Image source={{ uri: this.props.imageUrl }}
                style={styles.image}
                onLoadStart={() => { this.setState({ spinnerDisplay: true }) }}
                LonLoad={() => { this.setState({ spinnerDisplay: false }) }}
                onLoadEnd={() => { this.setState({ spinnerDisplay: false }) }}
            />
            <Spinner
                animating={this.state.spinnerDisplay}
                style={styles.spinner}
                color={styleColor}
            />
        </View>
    }
}