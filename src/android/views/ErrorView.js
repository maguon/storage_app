import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

export default class ErrorView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>ErrorView</Text>
            </View>
        )
    }

}
