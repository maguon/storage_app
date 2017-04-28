import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, } from 'native-base'

export default class Record extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (

                        <View style={{ flexDirection: "row" }}>
                            <Text>图标</Text>
                            <Text>时间</Text>
                            <Text>操作</Text>
                            <Text>图标</Text>
                            <Text>移位</Text>
                        </View>

        )

    }

}