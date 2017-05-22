import React, { Component } from 'react'
import {
    Text,
    View,
    Button,
    TouchableHighlight,
    StyleSheet
} from 'react-native'

import { Actions } from 'react-native-router-flux'

const CarListItem = ({ car }) => {
    let { plan_out_time, make_name, model_name, vin } = car
    plan_out_time = new Date(plan_out_time)
    let today = Date.now()
    let UTC = Date.parse(plan_out_time)
    let tag = ((UTC - today) <= 24 * 60 * 60 * 1000 * 5) ? (<View style={styles.contentTag}></View>) : (<Text></Text>)
    plan_out_time = plan_out_time.toLocaleDateString()
    // let plan_out_time_month = plan_out_time.getMonth() >= 9 ? `${(plan_out_time.getMonth() + 1)}` : `0${(plan_out_time.getMonth() + 1)}`
    // let plan_out_time_date = plan_out_time.getDate() >= 9 ? `${(plan_out_time.getDate() + 1)}` : `0${(plan_out_time.getDate() + 1)}`
    // let plan_out_time_hour = plan_out_time.getHours() >= 10 ? `${plan_out_time.getHours()}` : `0${plan_out_time.getHours()}`
    // let plan_out_time_minute = plan_out_time.getMinutes() >= 10 ? `${plan_out_time.getMinutes()}` : `0${plan_out_time.getMinutes()}`
    // plan_out_time = `${plan_out_time_month}-${plan_out_time_date}  ${plan_out_time_hour}:${plan_out_time_minute}`
console.log('car',car)
    return (
        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => { Actions.carInfo({ carId: car.id }) }}>
            <View style={styles.container}>
                <View style={[{ flex: 1 }, styles.content]}>
                    {tag}
                </View>
                <View style={[{ flex: 12 }, styles.content]}>
                    <Text style={styles.contentText}>{plan_out_time}</Text>
                </View>
                <View style={[{ flex: 16 }, styles.content]}>
                    <Text style={styles.contentText}>{vin}</Text>
                </View>
                <View style={[{ flex: 10 }, styles.content]}>
                    <Text style={styles.contentText}>{model_name}</Text>
                </View>
                <View style={[{ flex: 1 }, styles.content]}>
                    <Text style={styles.contentAction}>></Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderBottomWidth: 1,
        height: 40,
        alignItems: 'center',
        borderColor: '#dddddd'
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentText: {
        textAlign: 'center',
        color: '#999999',
        fontSize: 12
    },
    contentTag: {
        width: 5,
        height: 5,
        backgroundColor: '#f7656a',
        borderRadius: 3
    },
    contentAction: {
        color: '#cbd0d3'
    }
})

export default CarListItem