import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';
import Video from 'react-native-video';
import { Icon, Button, Spinner } from 'native-base'

export default class VideoView extends Component {
  constructor(props) {
    super(props)
    this.video = null;
    this.state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'stretch',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
      isLoadingVideo: true
    };
    this.onLoad = this.onLoad.bind(this)
    this.onProgress = this.onProgress.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.getCurrentTimePercentage = this.getCurrentTimePercentage.bind(this)
  }

  onLoad = (data) => {
    this.setState({ duration: data.duration, isLoadingVideo: false });
  };

  onProgress = (data) => {
    this.setState({ currentTime: data.currentTime });
  };

  onEnd = () => {
    this.setState({ paused: true })
    this.video.seek(0)
  };

  getCurrentTimePercentage() {
    if (this.state.currentTime > 0) {
      return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
    }
    return 0;
  };

  render() {
    const flexCompleted = this.getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
    const { initParam: { videoUrl } } = this.props
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.fullScreen}
          onPress={() => this.setState({ paused: !this.state.paused })}
        >
          <Video
            ref={video => this.video = video}
            source={{ uri: videoUrl }}
            style={styles.fullScreen}
            rate={this.state.rate}
            paused={this.state.paused}
            volume={this.state.volume}
            muted={this.state.muted}
            resizeMode={this.state.resizeMode}
            onLoad={this.onLoad}
            onLoadStart={() => {
              this.setState({ isLoadingVideo: true })
            }}
            onProgress={this.onProgress}
            onEnd={this.onEnd}
            repeat={false}
          />
        </TouchableOpacity>
        {this.state.paused && !this.state.isLoadingVideo && <View style={{ position: 'absolute' }}>
          <Button style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} onPress={() => this.setState({ paused: !this.state.paused })} >
            <Icon name='ios-play' style={{ color: 'rgba(255,255,255,0.4)' }} />
          </Button>
        </View>}
        {this.state.isLoadingVideo && <View style={{ position: 'absolute' }}>
          <Spinner color={'#fff'} />
        </View>}
        <View style={styles.controls}>
          <View style={styles.progress}>
            <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
            <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
});