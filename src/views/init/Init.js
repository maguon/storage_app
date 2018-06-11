import {
    Linking,
    ToastAndroid,
    Platform,
    View,
    Text,
    Dimensions,
    StatusBar,
    Image,
    StyleSheet,
    ImageBackground
} from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import * as actions from '../../actions'

const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.height

class Init extends Component {
    constructor(props) {
        super(props)
        this.linkDownload = this.linkDownload.bind(this)
    }

    componentDidMount() {
        this.props.validateVersion()
    }


    linkDownload(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url)
            } else {
                return Linking.openURL(url)
            }
        }).catch(err => console.error('An error occurred', err))
    }

    render() {
        // const { initializationReducer: { data, initAPP, loadLocalStorage, validateToken, validateVersion } } = this.props
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <ImageBackground source={{ uri: 'init_back' }} style={styles.image}>
                    {/* {initAPP.isResultStatus == 1 && <Spinkit type={'Wave'}
                        color='rgba(255,255,255,0.5)'
                        size={70}
                        style={{ marginBottom: 50, alignSelf: 'center' }}
                        isVisible={initAPP.isResultStatus == 1} />}
                    {(initAPP.isResultStatus == 2 && initAPP.step == 0 && validateVersion.isResultStatus == 3 || validateVersion.isResultStatus == 4) &&
                        <Button block onPress={this.props.validateVersion} style={styles.button}>
                            <Text style={styles.buttonTiltle}>重新获取版本号</Text>
                        </Button>}
                    {(initAPP.isResultStatus == 2 && initAPP.step == 0 && validateVersion.isResultStatus == 5) &&
                        <Button block onPress={() => this.linkDownload(data.version.url)} style={styles.button}>
                            <Text style={styles.buttonTiltle}>立即更新</Text>
                        </Button>}
                    {(initAPP.isResultStatus == 2 && initAPP.step == 1) &&
                        <Button block onPress={this.props.initPush} style={styles.button}>
                            <Text style={styles.buttonTiltle}>重新获取deviceToken</Text>
                        </Button>} */}
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: ImageWidth,
        height: ImageHeight,
        justifyContent: "flex-end"
    },
    buttonTiltle: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.4)'
    },
    button: {
        marginBottom: 30,
        width: window.width / 4 * 3,
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: 25,
        alignSelf: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        initializationReducer: state.initializationReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    // initPush: () => {
    //     dispatch(initializationAction.initPush())
    // },
    validateVersion: () => {
        dispatch(actions.init.validateVersion())
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(Init)
