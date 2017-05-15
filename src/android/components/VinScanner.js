import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Vibration,
  View
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
import { connect } from 'react-redux'

export default class VinScanner extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barcode: '',
      cameraType: 'back',
      text: 'Scan Barcode',
      torchMode: 'off',
      type: '',
    };
  }

     barcodeReceived(e) {
     if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();

    this.setState({
      barcode: e.data,
      text: `${e.data} (${e.type})`,
      type: e.type,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <BarcodeScanner
          onBarCodeRead={this.barcodeReceived.bind(this)}
          style={{ flex: 1 }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        />
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
     flex: 1
    // height:400,
    // width:400
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