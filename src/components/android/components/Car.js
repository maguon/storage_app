import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'


export default class Car extends Component {
    constructor(props) {
        super(props)
    }

    showCarInfo() {
        console.log('showCarInfo', this.props.nextPage)
        console.log('car', this.props.car)
        this.props.nextPage({ car: this.props.car })
    }

    render() {
        let { enter_time, make_name, model_name,vin } = this.props.car
        enter_time = new Date(enter_time)
        console.log(enter_time)
        let enter_time_month = enter_time.getMonth() >= 9 ? `${(enter_time.getMonth() + 1)}` : `0${(enter_time.getMonth() + 1)}`
        let enter_time_date = enter_time.getDate() >= 9 ? `${(enter_time.getDate() + 1)}` : `0${(enter_time.getDate() + 1)}`
        let enter_time_hour = enter_time.getHours() >= 10 ? `${enter_time.getHours()}` : `0${enter_time.getHours()}`
        let enter_time_minute = enter_time.getMinutes() >= 10 ? `${enter_time.getMinutes()}` : `0${enter_time.getMinutes()}`
        enter_time = `${enter_time_month}-${enter_time_date}  ${enter_time_hour}:${enter_time_minute}`
        let { nextPage } = this.props

        return (
            <View style={{ flexDirection: "row", paddingHorizontal: 10, justifyContent: 'center', borderBottomWidth: 1, height: 40, alignItems: 'center', borderColor: '#dddddd' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 5, height: 5, backgroundColor: '#f7656a', borderRadius: 5 }}></View>
                </View>
                <View style={{ flex: 12, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#999999', fontSize: 13 }}>{enter_time}</Text>
                </View>
                <View style={{ flex: 16, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#999999', fontSize: 13 }}>{vin}</Text>
                </View>
                <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', color: '#999999', fontSize: 13 }}>{model_name}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#cbd0d3' }} onPress={this.showCarInfo.bind(this)}>></Text>
                </View>


                {/*<View style={{ flex: 1 , }}>*/}

                {/*<Button style={{ flex: 1 }}
                        onPress={this.showCarInfo.bind(this)}
                        title="showCarInfo" />*/}
                {/*</View>*/}
            </View>
        )
    }
}