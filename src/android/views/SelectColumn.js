import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'

export default class SelectColumn extends Component {
    constructor(props) {
        super(props)
    }

    chageParkingId(param) {
        this.props.chageParkingId(param)
        Actions.pop({ popNum: this.props._popNum })
    }
    render() {
        console.log(this.props.columns)
        let columns = this.props.columns.map(item => {
            return (
                <TouchableHighlight key={item.col} underlayColor='rgba(0,0,0,0.1)' onPress={() => this.chageParkingId({
                    row: this.props.row,
                    column: item.col,
                    storageName: this.props.storageName,
                    storageId: this.props.storageId,
                    parkingId: item.parkingId,
                })}>
                    <Text>{item.col.toString()}</Text>
                </TouchableHighlight>)
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择道位'} />
                <ScrollView>
                    {columns}
                </ScrollView>
            </View>
        )
    }

}