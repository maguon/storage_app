import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

export default class Car extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>make_name:</Text>
                <Text>{this.props.car.make_name}</Text>
            </View>
        )
    }

}