
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

export default class ParkingViewItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>ParkingViewItem</Text>
            </View>
        )
    }

}