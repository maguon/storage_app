import React, { Component } from 'react'
import { Text, TextInput, View, Dimensions, ScrollView, Image } from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'


const window = Dimensions.get('window')

const CarInfo = ({ car, exportCar, moveCar, changeViewType }) => {
    let { col, row, plan_out_time, real_out_time, pro_date, engine_num, remark, storage_name, make_name, model_name } = car

    col = col ? col.toString() : ''
    row = row ? row.toString() : ''
    plan_out_time = plan_out_time ? plan_out_time : ''
    pro_date = pro_date ? pro_date : ''
    engine_num = engine_num ? engine_num : ''
    real_out_time = real_out_time ? (new Date(real_out_time)).toLocaleString() : ''
    remark = remark ? remark : ''
    storage_name = storage_name ? storage_name : ''
    make_name = make_name ? make_name : ''
    model_name = model_name ? model_name : ''


    let btn, carPosition, relExportTime, importAgainBtn
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
            <Text style={{ marginLeft: 10, fontSize: 14 }}>当前位置：{storage_name}-{row}-{col}</Text>
        </View>)
        relExportTime = (<View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
            <Text style={{ marginLeft: 10, fontSize: 14 }}>计划出库：{plan_out_time}</Text>
        </View>)
        importAgainBtn = (<View></View>)
    }
    else {
        btn = (<View></View>)
        carPosition = (<View></View>)
        relExportTime = (<View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
            <Text style={{ marginLeft: 10, fontSize: 14 }}>出库时间：{real_out_time}</Text>
        </View>)
        importAgainBtn = (<View style={{ marginVertical: 10, marginHorizontal: 20 }}>
            <View style={{ flex: 1, marginRight: 10 }}>
                <Button
                    full
                    style={{ backgroundColor: '#00cade', borderRadius: 5 }}
                    onPress={() => changeViewType(2)}>
                    <Text style={{ color: '#ffffff' }}>重新入库</Text>
                </Button>
            </View>
        </View>)
    }
    return (
        <View>
            <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                <View style={{ paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ color: '#00cade', marginLeft: 10, fontSize: 18 }}>VIN：{car.vin}</Text>
                </View>
                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <View style={{ flex: 1, paddingVertical: 10, marginLeft: 10 }}>
                        <Text style={{ fontSize: 14 }}>品牌：{make_name}</Text>
                    </View>
                    <View style={{ flex: 1, paddingVertical: 10, marginLeft: 10 }}>
                        <Text style={{ fontSize: 14 }}>型号：{model_name}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ marginLeft: 10, fontSize: 14 }}>颜色：</Text>
                    <View style={{ width: 20, height: 20, borderColor: '#dddddd', borderWidth: 1, alignSelf: 'center', backgroundColor: `#${car.colour}` }}></View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ marginLeft: 10, fontSize: 14 }}>发动机型号：{engine_num}</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ marginLeft: 10, fontSize: 14 }}>生产日期：{pro_date}</Text>
                </View>

                {relExportTime}
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                    <Text style={{ marginLeft: 10, fontSize: 14 }}>备注：{remark}</Text>
                </View>
                {carPosition}
            </View>

            <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Button
                        full
                        style={{ backgroundColor: '#00cade', borderRadius: 5 }}
                        onPress={() => changeViewType(1)}>
                        <Text style={{ color: '#ffffff' }}>编辑</Text>
                    </Button>
                </View>
            </View>
            {importAgainBtn}
            {btn}
        </View>
    )
}


export default CarInfo