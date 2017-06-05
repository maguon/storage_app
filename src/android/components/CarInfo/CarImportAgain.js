import React, { Component } from 'react'
import { Text, View, TouchableHighlight, DatePickerAndroid } from 'react-native'
import { connect } from 'react-redux'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'


export default class CarImportAgain extends Component {

    constructor(props) {
        super(props)
        this.showPicker = this.showPicker.bind(this)

    }
    async showPicker(options) {
        let { changePlanOutTimeForImportAgain } = this.props
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(options)
            if (action !== DatePickerAndroid.dismissedAction) {
                changePlanOutTimeForImportAgain(`${year}-${month + 1}-${day}`)
            }
        } catch ({ code, message }) {
            console.warn(`Error in example changePlanOutTime: `, message)
        }
    }

    render() {
        let { changeViewType,
            changeParkingForImportAgain,
            importAgain,
            importAgainCar } = this.props
        // console.log('importAgainCar', importAgainCar)
        let { colour, engine_num, make_name, model_name, pro_date, remark, planOutTime, storageName, vin, row, col } = importAgainCar
        return (
            <View>
                <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                    <View style={{ paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                        <Text style={{ color: '#00cade', marginLeft: 10, fontSize: 18 }}>VIN：{vin}</Text>
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
                        <View style={{ width: 20, height: 20, borderColor: '#dddddd', borderWidth: 1, alignSelf: 'center', backgroundColor: `#${colour}` }}></View>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14 }}>发动机型号：{engine_num}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14 }}>生产日期：{pro_date}</Text>
                    </View>
                    <TouchableHighlight underlayColor='rgba(0,0,0,0.1)'
                        onPress={() => this.showPicker({ date: new Date(), mode: 'spinner' })}
                    >
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                            <Text style={{ marginLeft: 10, fontSize: 14, flex: 2 }}>计划出库：</Text>
                            <Text style={{ fontSize: 14, flex: 5 }}>{planOutTime}</Text>
                            <Icon name='md-arrow-dropdown' style={{ flex: 1 }} />
                        </View>
                    </TouchableHighlight>

                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14 }}>备注：{remark}</Text>
                    </View>

                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => { Actions.SelectStorage({ _popNum: 3, chageParkingId: changeParkingForImportAgain }) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderColor: '#00cade', borderBottomWidth: 2 }}>
                            <Text style={{ color: 'red', flex: 1 }}>*</Text>
                            <Text style={{ color: '#00cade', fontSize: 16, flex: 4 }}>选择仓库</Text>
                            <Text style={{ color: '#00cade', fontSize: 16, flex: 10 }}>{storageName}</Text>
                            <Text style={{ fontSize: 14, flex: 1 }}>></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1, paddingVertical: 10,
                            marginLeft: 10, alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 16, flex: 4 }}>{row}</Text>
                            <Text style={{ fontSize: 16, flex: 1, color: '#00cade' }}>排</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, marginLeft: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, flex: 2 }}>{col}</Text>
                            <Text style={{ fontSize: 16, flex: 1, color: '#00cade' }}>道位</Text>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20 }} >
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Button
                            full
                            style={{ backgroundColor: '#00cade', borderRadius: 5 }}
                            onPress={importAgain}>
                            <Text style={{ color: '#ffffff' }}>入库</Text>
                        </Button>
                    </View >
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Button
                            full
                            style={{ backgroundColor: '#00cade', borderRadius: 5 }}
                            onPress={() => changeViewType(0)}>
                            <Text style={{ color: '#ffffff' }}>取消</Text>
                        </Button>
                    </View>
                </View>
            </View>
        )
    }
}

