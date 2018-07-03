import React, { Component } from 'react'
import {
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    Modal,
    ActivityIndicator
} from 'react-native'
import Camera from 'react-native-camera'
import { Icon } from 'native-base'
import moment from 'moment'
import { ProcessingManager } from 'react-native-video-processing'

export default class CameraComponent extends Component {
    constructor(props) {
        super(props);
        this.camera = null
        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            },
            isRecording: false,
            isRecordingSuccess: false,
            currentSec: 0,
            maxSec: 20,
            videoPatch: '',
            isCompressing: false
        };
        this.startRecording = this.startRecording.bind(this)
        this.stopRecording = this.stopRecording.bind(this)
        this.startTiming = this.startTiming.bind(this)
        this.compressVideo = this.compressVideo.bind(this)
    }

    compressVideo() {
        this.setState({ isCompressing: true })
        const options = {
            width: 270,
            height: 480,
            bitrateMultiplier: 12,
            minimumBitrate: 300000,
            removeAudio: false
        };
        ProcessingManager.compress(this.state.videoPatch, options) // like VideoPlayer compress options
            .then((data) => {
                this.props.uploadCarVideo(data)
                this.setState({ isCompressing: false })
            })
    }

    startTiming = () => {
        const interval = setInterval(() => {
            if (!this.state.isRecording) {
                clearInterval(interval)
            }
            if (this.state.currentSec < this.state.maxSec) {
                this.setState({ currentSec: this.state.currentSec + 1 })
            }
            else {
                clearInterval(interval)
                this.stopRecording()
            }
        }, 1000)
    }

    startRecording() {
        if (this.camera) {
            this.startTiming()
            this.camera.capture({ mode: Camera.constants.CaptureMode.video, captureQuality: Camera.constants.CaptureQuality.low })
                .then((data) => {
                    const { path } = data
                    this.setState({ isRecordingSuccess: true, videoPatch: path })
                })
                .catch(err => console.error(err))
            this.setState({
                isRecording: true,
                isRecordingSuccess: false,
                currentSec: 0
            })
        }
    }

    stopRecording() {
        if (this.camera) {
            this.camera.stopCapture()
            this.setState({
                isRecording: false
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated
                    hidden
                />
                <Camera
                    ref={(cam) => {
                        this.camera = cam
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    mirrorImage={false}
                />
                <View style={{ position: 'absolute', top: 20, right: 20 }}>
                    <Text style={{ color: '#fff' }}>{moment({ m: 0, s: this.state.currentSec }).format('mm:ss')}</Text>
                </View>
                <View style={[styles.overlay, styles.bottomOverlay, { justifyContent: this.state.isRecordingSuccess ? 'space-between' : 'center' }]}>
                    {!this.state.isRecordingSuccess && !this.state.isRecording && <TouchableOpacity
                        style={[styles.captureButton, { backgroundColor: 'red' }]}
                        onPress={this.startRecording} />}
                    {!this.state.isRecordingSuccess && this.state.isRecording && <TouchableOpacity
                        style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderColor: 'rgba(255,255,255,0.4)', borderWidth: 0.5 }}
                        onPress={this.stopRecording} >
                        <Icon name='ios-square' style={{ color: 'red', fontSize: 30 }} />
                    </TouchableOpacity>}
                    {this.state.isRecordingSuccess && <TouchableOpacity
                        style={{ backgroundColor: 'white', width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}
                        onPress={() => this.setState({ isRecordingSuccess: false })}>
                        <Icon name='ios-close' style={{ color: 'red', fontSize: 50 }} />
                    </TouchableOpacity>}
                    {this.state.isRecordingSuccess && <TouchableOpacity
                        style={{ backgroundColor: 'white', width: 60, height: 60, justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}
                        onPress={() => {
                            this.setState({ isRecordingSuccess: false })
                            this.compressVideo()
                        }}>
                        <Icon name='ios-checkmark' style={{ color: 'green', fontSize: 50 }} />
                    </TouchableOpacity>}
                </View>
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.isCompressing}
                    onRequestClose={() => { }}>
                    <View style={styles.modalContainer} >
                        <View style={styles.modalItem}>
                            <ActivityIndicator
                                animating={this.state.isCompressing}
                                style={styles.modalActivityIndicator}
                                size="large"
                            />
                            <Text style={styles.modalText}>正在上传视频...</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        padding: 16,
        right: 0,
        left: 0,
        alignItems: 'center',
    },
    topOverlay: {
        top: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomOverlay: {
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButton: {
        padding: 30,
        borderRadius: 30,
    },
    typeButton: {
        padding: 5,
    },
    flashButton: {
        padding: 5,
    },
    buttonsSpace: {
        width: 10,
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