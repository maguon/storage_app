import React, { Component } from 'react'
import { Text, TextInput, View, Dimensions, ScrollView, Image, TouchableHighlight, DatePickerAndroid } from 'react-native'
import { Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as colorList from '../../../config/ColorList.json'

const window = Dimensions.get('window')



export default class CarEdit extends Component {
    constructor(props) {
        super(props)
        this.colorPanelRender = this.colorPanelRender.bind(this)
        this.showPicker = this.showPicker.bind(this)
        this.changeModel = this.changeModel.bind(this)
    }

    async showPicker(stateKey, options) {
        let { changeEditCarInfoField } = this.props
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(options)
            if (action !== DatePickerAndroid.dismissedAction) {
                let param = {}
                param[stateKey] = `${year}-${month + 1}-${day}`
                changeEditCarInfoField(param)
            }
        } catch ({ code, message }) {
            console.warn(`Error in example '${stateKey}': `, message)
        }
    }

    changeModel(param) {
        let { changeEditCarInfoField } = this.props
        let newParam = {
            make_id: param.makeId,
            make_name: param.makeName,
            model_id: param.modelId,
            model_name: param.modelName
        }
        changeEditCarInfoField(newParam)
    }

    colorPanelRender() {
        let { colour } = this.props.car
        let { changeEditCarInfoField } = this.props
        let colorPanel = colorList.list.map(item => {
            if (colour != item.colorId)
                return (<TouchableHighlight key={item.colorName} underlayColor='rgba(0,0,0,0.1)' onPress={() => changeEditCarInfoField({ colour: item.colorId })}>
                    <View key={item.colorName} style={{ width: 20, height: 20, borderColor: `#dddddd`, borderWidth: 1, alignSelf: 'center', backgroundColor: `#${item.colorId}`, marginVertical: 2, marginHorizontal: 2 }}></View></TouchableHighlight>
                )
            else
                return (
                    <View key={item.colorName} style={{ width: 20, height: 20, borderColor: `green`, borderWidth: 2, alignSelf: 'center', backgroundColor: `#${item.colorId}`, marginVertical: 2, marginHorizontal: 2 }} ><Icon name='check' size={8} color='green' style={{ position: 'absolute', right: 0, bottom: 0 }} /></View>)
        })
        return (<View style={{ flex: 3, flexDirection: 'row', flexWrap: 'wrap' }}>{colorPanel}</View>)
    }
    render() {
        let { car,
            exportCar,
            moveCar,
            changeViewType,
            changeEditCarInfoField,
            updateCarInfo } = this.props
        let { make_name, model_name, engine_num, pro_date, plan_out_time, remark, row, col, storage_name } = car
        console.log(car)
        let _plan_out_time = {}
        let _row = row ? row.toString() : ''
        let _col = col ? col.toString() : ''
        let btn, carPosition
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
                <Text style={{ marginLeft: 10, fontSize: 14 }}>当前位置：{storage_name}-{_row}-{_col}</Text>
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
                    <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => Actions.SelectCarMake({ onSelectModel: this.changeModel })}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dddddd', paddingVertical: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 14, flex: 4 }}>品牌(型号)：</Text>
                            <Text style={{ fontSize: 14, flex: 10 }}>{make_name}{model_name}</Text>
                            <Text style={{ fontSize: 14, flex: 1 }}>></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                        <Text style={{ flex: 1, marginLeft: 10, fontSize: 14 }}>颜色：</Text>
                        {this.colorPanelRender()}
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, flex: 1 }}>发动机号：</Text>
                        <TextInput underlineColorAndroid="transparent"
                            onChangeText={(text) => changeEditCarInfoField({ engine_num: text })}
                            value={engine_num}
                            style={{ flex: 3, padding: 0, fontSize: 14 }} />
                    </View>
                    <TouchableHighlight underlayColor='rgba(0,0,0,0.1)'
                        onPress={() => this.showPicker('pro_date', { date: new Date(), mode: 'spinner' })}
                    >
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                            <Text style={{ marginLeft: 10, fontSize: 14, flex: 2 }}>生产日期：</Text>
                            <Text style={{ fontSize: 14, flex: 5 }}>{pro_date}</Text>
                            <Icon name='caret-down' style={{ flex: 1 }} />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor='rgba(0,0,0,0.1)'
                        onPress={() => this.showPicker('plan_out_time', { date: new Date(), mode: 'spinner' })}
                    >
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                            <Text style={{ marginLeft: 10, fontSize: 14, flex: 2 }}>计划出库：</Text>
                            <Text style={{ fontSize: 14, flex: 5 }}>{plan_out_time}</Text>
                            <Icon name='caret-down' style={{ flex: 1 }} />
                        </View>
                    </TouchableHighlight>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, flex: 1 }}>备注：</Text>
                        <TextInput underlineColorAndroid="transparent"
                            onChangeText={(text) => changeEditCarInfoField({ remark: text })}
                            value={remark}
                            style={{ flex: 3, padding: 0, fontSize: 14 }} />
                    </View>
                    {carPosition}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20 }} >
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Button
                            full
                            style={{ backgroundColor: '#00cade', borderRadius: 5 }}
                            onPress={updateCarInfo}>
                            <Text style={{ color: '#ffffff' }}>保存</Text>
                        </Button>
                    </View >
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Button
                            full
                            style={{ backgroundColor: '#00cade', borderRadius: 5 }}
                            onPress={() => changeViewType(0)}>
                            <Text style={{ color: '#ffffff' }}>取消编辑</Text>
                        </Button>
                    </View>
                </View>
                {btn}
            </View>
        )
    }
}



