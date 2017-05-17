import React, { Component } from 'react'
import { Text, View ,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'

export default class SelectStorage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择仓库'} />
                <ScrollView>
                    <Text onPress={Actions.SelectRow}>SelectStorage</Text>
                </ScrollView>
            </View>
        )
    }

}