import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, ListItem } from 'native-base'
import RecordItem from './RecordItem'

export default class Record extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <ListItem >
                    <View>
                        <View><Text>日期</Text></View>
                        <RecordItem />
                    </View>
                </ListItem >
            </View>
        )

    }

}