import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'

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
            <View style={{ flexDirection: "row" }}>
                <Text>{this.props.storage.storage_name}</Text>
                <Text>剩余车位：{this.props.storage.pCount}</Text>
                <Button title='查看'
                    onPress={this.showParkingView.bind(this)} />
            </View>
        )
    }

}