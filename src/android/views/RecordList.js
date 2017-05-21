import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'

export default class RecordList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBar title='工作记录' />
                <Text>RecordList</Text>
            </View>
        )
    }

}