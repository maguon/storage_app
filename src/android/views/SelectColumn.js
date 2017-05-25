import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'
import { List, ListItem } from 'native-base'

export default class SelectColumn extends Component {
    constructor(props) {
        super(props)
    }

    chageParkingId(param) {
        this.props.chageParkingId(param)
        Actions.pop({ popNum: this.props._popNum })
    }
    render() {
        //console.log(this.props.columns)
        let columns = this.props.columns.map(item => {
            return (
                <ListItem key={item.col} button onPress={() => this.chageParkingId({
                    row: this.props.row,
                    column: item.col,
                    storageName: this.props.storageName,
                    storageId: this.props.storageId,
                    parkingId: item.parkingId,
                })}>

                    <Text>{item.col.toString()}</Text>
                </ListItem>
            )
        })
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择道位'} />
                <ScrollView>
                    <List>
                        {columns}
                    </List>
                </ScrollView>
            </View>
        )
    }

}