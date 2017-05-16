import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

export default class SelectCarMake extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Text>SelectCarMake</Text>
                <Button title='下一步' onPress={() => Actions.SelectCarModel()} />
                <Button title='上一步' onPress={() =>  Actions.pop()} />
                <Button title='返回首页' onPress={() => Actions.popTo('ImportCar')} />
            </View>
        )
    }

}