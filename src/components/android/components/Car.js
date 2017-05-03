import React, { Component } from 'react'
import { Text, View,Button } from 'react-native'


export default class Car extends Component {
    constructor(props) {
        super(props)
    }

    showCarInfo() {
        console.log('showCarInfo',this.props.nextPage)
        console.log('car',this.props.car)
        this.props.nextPage({car:this.props.car})
    }

    render() {
        let { enter_time, make_name, model_name } = this.props.car
        let{nextPage}=this.props
        return (
            <View style={{ flexDirection: "row" }}>
                <Text style={{ flex: 2 }}>{enter_time}</Text>
                <Text style={{ flex: 1 }}>{make_name}</Text>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <Text style={{ flex: 1 }}>{model_name}</Text>
                    <Button style={{ flex: 1 }}
                        onPress={this.showCarInfo.bind(this)}
                        title="showCarInfo" />
                </View>
            </View>
        )
    }
}