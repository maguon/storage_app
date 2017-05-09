import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import RecordItem from './RecordItem'


const window = Dimensions.get('window')

export default class Record extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let created_on = new Date(this.props.record.created_on)
        created_on = `${created_on.getFullYear()}年${created_on.getMonth() + 1}月${created_on.getDate() + 1}日`
        let recordItem = this.props.record.data.map((item) => {
            return <RecordItem recordItem={item} key={item._id} />
        })
        return (
            <View >
                <View style={{ width: window.width / 2, backgroundColor: '#f1f1f1', borderRadius: 15, alignItems: 'center',marginBottom:5 }}>
                    <Text style={{ marginBottom: 5, marginTop: 5 }}>{created_on}</Text>
                </View>
                {recordItem}
            </View>
        )
    }
}