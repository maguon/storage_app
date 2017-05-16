import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

export default class SelectCarModel extends Component {
    constructor(props) {
        super(props)
    }
//Actions.pop({popNum:2, refresh:({'key':value})})
    render() {
        return (
            <View>
                <Text>SelectCarModel</Text>
                <Button title='上一步' onPress={() =>  Actions.pop()} />
                <Button title='返回首页' onPress={() => Actions.popTo('ImportCar')} />

                    
            </View>
        )
    }

}