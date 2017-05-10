import React, { Component } from 'react'
import { Text, View, Button, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Parking extends Component {
    constructor(props) {
        super(props)
    }
    
    showParkingView() {
        this.props.nextPage({ storage: this.props.storage })
        //,getParkingById:this.props.getParkingById
    }

    render() {
        return (
            <View style={{ flexDirection: "row", backgroundColor: '#f8f8f8', borderColor: '#e1e1e1', borderBottomWidth: 1, paddingVertical: 10, paddingHorizontal: 20 }}>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name='home' size={20} color='#00cade' />
                    </View>
                </View>
                <View style={{ flex: 8, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#8b8b8b' }}>{this.props.storage.storage_name}</Text>
                </View>
                <View style={{ flex: 8, alignItems: 'center', flexDirection: 'row' }}>
                    <View>
                        <Text style={{ fontSize: 13, color: '#bfbfbf' }}>剩余车位：</Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 13, color: '#f7656a' }}>{this.props.storage.pCount}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#c2c2c2' }} onPress={this.showParkingView.bind(this)}>></Text>
                </View>
            </View>
        )
    }

}