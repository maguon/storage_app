import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import Record from './Record'
import { Text, List } from 'native-base'

export default class RecordList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let records = this.props.records
            .reduce((acc, val) => {
                let obj = acc.find((item) => item.created_on == val.created_on)
                if (obj) {
                    obj.data.push(val)
                } else {
                    acc.push({ created_on: val.created_on, key: acc.length, data: [val] })
                }
                return acc
            }, [])
            .sort((a, b) => {
                return a.created_on > b.created_on
            })
            .map((item) => {
                return <Record record={item} key={item.key} />
            })

        return (
            <ScrollView>
                <Text>工作记录</Text>
                <List>
                    {records}
                </List>
            </ScrollView>
        )
    }
}