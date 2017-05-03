import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, } from 'native-base'

export default class Record extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { created_on, op, comment } = this.props.recordItem
        return (

            <View style={{ flexDirection: "row" }}>

                <Text style={{ color: 'red' }} > {created_on}</Text>
                <Text>{op}</Text>
                <Text style={{ color: 'red' }} > {comment}</Text>
            </View>

        )

    }

}