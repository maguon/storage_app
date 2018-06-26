import React, { Component } from 'react'
import {
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import Camera from 'react-native-camera'


export default class CameraComponent extends Component {
    constructor(props) {
        super(props);

        this.camera = null;

        this.state = {
            camera: {
                aspect: Camera.constants.Aspect.fill,
                captureTarget: Camera.constants.CaptureTarget.cameraRoll,
                type: Camera.constants.Type.back,
                orientation: Camera.constants.Orientation.auto,
                flashMode: Camera.constants.FlashMode.auto,
            },
            isRecording: false
        };
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
    }


    startRecording() {  
        if (this.camera) {  
          this.camera.capture({mode: Camera.constants.CaptureMode.video})  
              .then((data) => console.log(data))  
              .catch(err => console.error(err));  
          this.setState({  
            isRecording: true  
          });  
        }  
      }  
      
      stopRecording() {  
        if (this.camera) {  
          this.camera.stopCapture();  
          this.setState({  
            isRecording: false  
          });  
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
                        this.camera = cam;
                    }}
                    style={styles.preview}
                    aspect={this.state.camera.aspect}
                    captureTarget={this.state.camera.captureTarget}
                    type={this.state.camera.type}
                    flashMode={this.state.camera.flashMode}
                    defaultTouchToFocus
                    mirrorImage={false}
                />
                <View style={[styles.overlay, styles.bottomOverlay]}>
                    <View style={styles.buttonsSpace} />
                    {
                        !this.state.isRecording
                        &&
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this.startRecording}
                        >
                            <Text>开始摄像</Text>
                        </TouchableOpacity>
                        ||
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={this.stopRecording}
                        >
                            <Text>停止摄像</Text>
                        </TouchableOpacity>
                    }
                </View>
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
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 40,
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
});  