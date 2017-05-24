import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, Image } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const window = Dimensions.get('window')

const CarInfo = ({ car, exportCar, moveCar }) => {
    let btn, carPosition
    // console.log('car.rel_status', car.rel_status)
    if (car.rel_status == 1) {
        btn = (<View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20 }} >
            <View style={{ flex: 1, marginRight: 10 }}>
                <Button
                    full
                    style={{ backgroundColor: '#00cade', borderRadius: 5 }}
                    onPress={moveCar}>
                    <Text style={{ color: '#ffffff' }}>移位</Text>
                </Button>
            </View >
            <View style={{ flex: 1, marginLeft: 10 }}>
                <Button
                    full
                    style={{ backgroundColor: '#00cade', borderRadius: 5 }}
                    onPress={exportCar}>
                    <Text style={{ color: '#ffffff' }}>出库</Text>
                </Button>
            </View>
        </View>)
        carPosition = (<View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
            <Text style={{ marginLeft: 10, fontSize: 14 }}>当前位置：{car.storage_name}-{car.row.toString()}-{car.col.toString()}</Text>
        </View>)

    }
    else {
        btn = (<View></View>)
        carPosition = (<View></View>)
    }
    return (
        <View>
            <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                <View style={{ paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ color: '#00cade', marginLeft: 10, fontSize: 18 }}>VIN：{car.vin}</Text>
                </View>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <View style={{
                        flex: 1, paddingVertical: 10,
                        marginLeft: 10
                    }}>
                        <Text style={{ fontSize: 14 }}>品牌：{car.make_name}</Text>
                    </View>
                    <View style={{ flex: 1, paddingVertical: 10, marginLeft: 10 }}>
                        <Text style={{ fontSize: 14 }}>型号：{car.model_name}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ marginLeft: 10, fontSize: 14 }}>颜色：</Text>
                    <View style={{ width: 20, height: 20, borderColor: '#dddddd', borderWidth: 1, alignSelf: 'center', backgroundColor: `#${car.colour}` }}></View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ marginLeft: 10, fontSize: 14 }}>发动机型号：{car.engine_num}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ marginLeft: 10, fontSize: 14 }}>生产日期：{new Date(car.pro_date).toLocaleDateString()}</Text>
                </View>
                {carPosition}
            </View>
            {btn}

        </View>
    )
}


export default CarInfo