import React, { Component } from 'react'
import { View,Text } from 'react-native'
import RecordItem from './RecordItem'

export default class Record extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { created_on } = this.props.record
        let recordItem = this.props.record.data.map((item) => {
            return <RecordItem recordItem={item} key={item._id} />
        })
        return (
            <View>
                <View><Text>{created_on}</Text></View>
                {recordItem}
            </View>
        )
    }
}