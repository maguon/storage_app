import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'

export default class SelectColumn extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.columns)
        let columns = this.props.columns.map(item => {
            return (
                <TouchableHighlight key={item} underlayColor='rgba(0,0,0,0.1)' onPress={() => {
                    Actions.pop({
                        popNum: 3,
                        refresh: {
                            row: this.props.row,
                            column: item,
                            storageName: this.props.storageName,
                            storageId: this.props.storageId,
                            selectType: 1
                        }
                    })

                }}>
                    <Text>{item}</Text>
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