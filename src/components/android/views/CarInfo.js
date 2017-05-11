/**
 * Created by rbyu on 2017/5/11.
 */
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

export default class CarModel extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>CarModel</Text>
            </View>
        )
    }

}