import React, { Component } from 'react'
import { Text, View ,ScrollView} from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'

export default class SelectRow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择排'} />
                <ScrollView>
                    <Text  onPress={Actions.SelectColumn}>SelectRow</Text>
                </ScrollView>

            </View>
        )
    }

}