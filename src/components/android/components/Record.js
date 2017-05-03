import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, ListItem } from 'native-base'
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
                <ListItem >
                    <View>
                        <View><Text>{created_on}</Text></View>
                        {recordItem}
                    </View>
                </ListItem >
            </View>
        )
    }
}