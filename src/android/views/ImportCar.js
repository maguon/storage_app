import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    TextInput,
    DrawerLayoutAndroid,
    Dimensions,
    DatePickerAndroid,
    TouchableHighlight,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImporCarAction from '../../actions/ImporCarAction'
import * as colorList from '../../config/ColorList.json'
import { Actions } from 'react-native-router-flux'


const window = Dimensions.get('window')

class ImportCar extends Component {
    constructor(props) {
        super(props)

        this.showPicker = this.showPicker.bind(this)
    }


    componentWillUnmount(){
        
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { imporCarReducer } = nextProps
        let { carId, vin } = imporCarReducer.importCar.data
        if (imporCarReducer.importCar.isExecStatus == 1) {
            console.log('imporCarReducer.importCar', '开始执行')
        } else if (imporCarReducer.importCar.isExecStatus == 2) {
            if (imporCarReducer.importCar.isResultStatus == 0) {
                console.log('imporCarReducer.importCar执行成功', imporCarReducer.importCar.data)
                this.props.resetImportCar()
                Actions.ImportCarCamera({ carId, vin })
            } else if (imporCarReducer.importCar.isResultStatus == 1) {
                console.log('imporCarReducer.importCar执行错误', imporCarReducer.importCar.errorMsg)
                this.props.resetImportCarExecuteStatus()
                Alert.alert('入库失败', imporCarReducer.importCar.errorMsg)
            }
            else if (imporCarReducer.importCar.isResultStatus == 2) {
                console.log('imporCarReducer.importCar执行失败', imporCarReducer.importCar.failedMsg)
                this.props.resetImportCarExecuteStatus()
                Alert.alert('入库失败', imporCarReducer.importCar.failedMsg)
            }
        }
        return true
    }


    importCar() {
        let param = {
            requiredParam: {
                userid: this.props.user.userId
            },
            postParam: {
                ...this.props.imporCarReducer.importCar.data,
                colour: this.props.imporCarReducer.importCar.data.color
            }
        }
        this.props.importCar(param)
    }

    colorPanelRender() {
        let { color } = this.props.imporCarReducer.importCar.data
        let colorPanel = colorList.list.map(item => {
            if (color != item.colorId)
                return (<TouchableHighlight key={item.colorName} underlayColor='rgba(0,0,0,0.1)' onPress={() => this.props.changeImportCarField({ color: item.colorId })}>
                    <View key={item.colorName} style={{ width: 20, height: 20, borderColor: `#dddddd`, borderWidth: 1, alignSelf: 'center', backgroundColor: `#${item.colorId}`, marginVertical: 2, marginHorizontal: 2 }}></View></TouchableHighlight>
                )
            else
                return (
                    <View key={item.colorName} style={{ width: 20, height: 20, borderColor: `green`, borderWidth: 2, alignSelf: 'center', backgroundColor: `#${item.colorId}`, marginVertical: 2, marginHorizontal: 2 }} ><Icon name='check' size={8} color='green' style={{ position: 'absolute', right: 0, bottom: 0 }} /></View>)
        })
        return (<View style={{ flex: 3, flexDirection: 'row', flexWrap: 'wrap' }}>{colorPanel}</View>)
    }

    async showPicker(stateKey, options) {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open(options)
            if (action !== DatePickerAndroid.dismissedAction) {
                let param = {}
                param[stateKey] = `${year}-${month + 1}-${day}`
                this.props.changeImportCarField(param)
            }
        } catch ({ code, message }) {
            console.warn(`Error in example '${stateKey}': `, message)
        }
    }

    render() {
        let { vin,
            engineNum,
            proDate,
            planOutTime,
            remark,
            makeName,
            modelName,
            storageName,
            row,
            column } = this.props.imporCarReducer.importCar.data
        console.log(this.props.imporCarReducer.importCar.data)
        return (

            <View style={{ flex: 1 }}>
                <NavBar title={'车辆入库'} />
                <ScrollView>
                    <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                        <View style={{ paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd', flexDirection: 'row' }}>
                            <Text style={{ color: 'red' }}>*</Text>
                            <Text style={{ color: '#00cade', marginLeft: 10, fontSize: 18, flex: 1 }}>VIN：</Text>

                            <TextInput underlineColorAndroid="transparent"
                                onChangeText={(text) => this.props.changeImportCarField({ vin: text })}
                                value={vin}
                                style={{ flex: 3, padding: 0, color: '#00cade', fontSize: 18 }} />
                        </View>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => Actions.SelectCarMake({ onSelectModel: this.props.changeImportCarField })}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dddddd', paddingVertical: 10, marginLeft: 10 }}>
                                <Text style={{ fontSize: 14, flex: 4 }}>品牌(型号)：</Text>
                                <Text style={{ fontSize: 14, flex: 10 }}>{makeName}{modelName}</Text>
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
                                onChangeText={(text) => this.props.changeImportCarField({ engineNum: text })}
                                value={engineNum}
                                style={{ flex: 3, padding: 0, fontSize: 14 }} />
                        </View>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => this.showPicker('proDate', { date: new Date(), mode: 'spinner' })}>
                            <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                                <Text style={{ marginLeft: 10, fontSize: 14, flex: 2 }}>生产日期：</Text>
                                <Text style={{ fontSize: 14, flex: 5 }}>{proDate}</Text>
                                <Icon name='caret-down' style={{ flex: 1 }} />
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => this.showPicker('planOutTime', { date: new Date(), mode: 'spinner' })}>
                            <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                                <Text style={{ marginLeft: 10, fontSize: 14, flex: 2 }}>出库日期：</Text>
                                <Text style={{ fontSize: 14, flex: 5 }}>{planOutTime}</Text>
                                <Icon name='caret-down' style={{ flex: 1 }} />
                            </View>
                        </TouchableHighlight>
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd', alignItems: 'center' }}>
                            <Text style={{ marginLeft: 10, fontSize: 14, flex: 1 }}>备注：</Text>
                            <TextInput underlineColorAndroid="transparent"
                                onChangeText={(text) => this.props.changeImportCarField({ remark: text })}
                                value={remark}
                                style={{ flex: 3, padding: 0, fontSize: 14 }} />
                        </View>
                    </View>

                    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => Actions.SelectStorage({ _popNum: 3, chageParkingId: this.props.changeImportCarField })}>
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
                                <Text style={{ fontSize: 16, flex: 2 }}>{column}</Text>
                                <Text style={{ fontSize: 16, flex: 1, color: '#00cade' }}>道位</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                        <Button full style={{ backgroundColor: '#00cade' }} onPress={this.importCar.bind(this)}>
                            <Text style={{ color: '#ffffff' }}>确定</Text>
                        </Button>
                    </View>
                </ScrollView>
            </View >
        )
    }
}


const mapStateToProps = (state) => {
    return {
        imporCarReducer: state.ImporCarReducer,
        user: state.LoginReducer.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    importCar: (param) => {
        dispatch(ImporCarAction.importCar(param))
    },
    resetImportCarExecuteStatus: () => {
        dispatch(ImporCarAction.resetImportCarExecuteStatus())
    },
    resetImportCar: () => {
        dispatch(ImporCarAction.resetImportCar())
    },
    changeImportCarField: (param) => {
        dispatch(ImporCarAction.changeImportCarField(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCar)
