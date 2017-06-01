import React, { Component } from 'react'
import {
    Text,
    View,
    Button,
    TouchableHighlight,
    StyleSheet,
    Image
} from 'react-native'
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const CarListItem = ({ car }) => {
    let { plan_out_time, make_name, model_name, vin, colour, enter_time, col, row } = car
    plan_out_time = new Date(plan_out_time)
    let today = Date.now()
    let UTC = Date.parse(plan_out_time)
    let tag = ((UTC - today) <= 24 * 60 * 60 * 1000 * 5) ? (<View style={styles.contentTag}></View>) : (<View></View>)
    plan_out_time = plan_out_time.toLocaleDateString()
    enter_time = (new Date(enter_time)).toLocaleString()
    let carColor = colour ? (<View style={{ backgroundColor: `#${colour}`, width: 15, height: 15, borderWidth: 0.5, borderColor: '#cccccc' }} />) : (<View></View>)
    return (
        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => { Actions.carInfo({ carId: car.id }) }}>
            <View style={{ paddingVertical: 5, paddingHorizontal: 10, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#f1f1f1' }}>
                <View style={{ flex: 1, paddingTop: 5 }}>
                    {tag}
                </View>
                <View style={{ flexDirection: 'column', flex: 14 }}>
                    <View>
                        <Text style={{ color: '#00cade', fontSize: 16 }}>vin:{vin}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Image source={{ uri: 'import_car' }} style={{ width: 12, height: 12 }} />
                        </View>
                        <View style={{ flex: 7 }}>
                            <Text style={{ textAlign: 'left' }}>{enter_time}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Image source={{ uri: 'planexport_car' }} style={{ width: 12, height: 12 }} />
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text style={{ textAlign: 'left' }}>{plan_out_time}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}>
                        <View style={{ flex: 1 }}>
                            <Icon name='ios-car' style={{ fontSize: 15, color: '#cccccc' }} type="ionicons" />
                        </View>
                        <View style={{ flex: 7, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flex: 5 }}>
                                <Text>{model_name}</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                {carColor}
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Icon name='ios-pin' style={{ fontSize: 15, color: '#cccccc' }} type="ionicons" />
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text>{row}-{col}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignSelf: 'center', }}>
                    <Icon name='ios-arrow-forward' style={{ fontSize: 30, color: '#888888', textAlign: 'center', }} type="ionicons" />
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