import React, { Component } from 'react'
import { Text, View, TextInput, DrawerLayoutAndroid, Dimensions, DatePickerAndroid, TouchableHighlight } from 'react-native'
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
        this.state = {
            vin: '',
            makeId: -1,
            makeName: '',
            modelId: -1,
            modelName: '',
            proDate: '',
            colour: 'FFFFFF',
            engineNum: '',
            remark: '',
            parkingId: '',
            storageId: 0,
            storageName: '',
            planOutTime: '',

            row: '',
            column: '',
        }
    }

    requestImportCar() {

        this.props.ImportCar({
            requiredParam: {
                userid: 3
            },
            postParam: {
                ...this.state
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps', nextProps)
        if (nextProps.selectType == 0) {
            let { makeId, modelId, makeName, modelName } = nextProps
            this.setState({
                modelName,
                makeId,
                makeName,
                modelId,
            })
        } else if (nextProps.selectType == 1) {
            let { row, column, storageName, storageId, parkingId } = nextProps
            this.setState({
                row,
                column,
                storageName,
                storageId,
                parkingId
            })
        }
        if (nextProps.car.carId != -1) {
            console.log(nextProps.car.carId)
            Actions.ImportCarCamera()
        }
    }

    colorPanelRender() {
        let colorPanel = colorList.list.map(item => {
            if (this.state.colour != item.colorId)
                return (<TouchableHighlight key={item.colorName} underlayColor='rgba(0,0,0,0.1)' onPress={() => this.setState({ colour: item.colorId })}>
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
            let newState = {}
            const { action, year, month, day } = await DatePickerAndroid.open(options)
            if (action !== DatePickerAndroid.dismissedAction) {
                let date = new Date(year, month, day);
                newState[stateKey] = date.toLocaleDateString()
                this.setState(newState)
            }

        } catch ({ code, message }) {
            console.warn(`Error in example '${stateKey}': `, message)
        }
    }

    render() {
        let { car } = this.props.car
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'车辆入库'} />
                <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                    <View style={{ paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd', flexDirection: 'row' }}>
                        <Text style={{ color: 'red' }}>*</Text>
                        <Text style={{ color: '#00cade', marginLeft: 10, fontSize: 18, flex: 1 }}>VIN码：</Text>

                        <TextInput underlineColorAndroid="transparent"
                            onChangeText={(text) => { this.setState({ vin: text }) }}
                            value={this.state.vin}
                            style={{ flex: 3, padding: 0, color: '#00cade', fontSize: 18 }} />
                    </View>
                    <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={Actions.SelectCarMake}>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dddddd', paddingVertical: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 14, flex: 4 }}>品牌(型号)：</Text>
                            <Text style={{ fontSize: 14, flex: 10 }}>{this.state.makeName}{this.state.modelName}</Text>
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
                            onChangeText={(text) => { this.setState({ engineNum: text }) }}
                            value={this.state.engineNum}
                            style={{ flex: 3, padding: 0, fontSize: 14 }} />
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, flex: 2 }}>生产日期：</Text>
                        <Text style={{ fontSize: 14, flex: 5 }}>{this.state.proDate}</Text>
                        <Icon name='caret-down' style={{ flex: 1 }} onPress={this.showPicker.bind(this, 'proDate', { date: new Date(), mode: 'spinner' })} />
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                        <Text style={{ marginLeft: 10, fontSize: 14, flex: 2 }}>出库日期：</Text>
                        <Text style={{ fontSize: 14, flex: 5 }}>{this.state.planOutTime}</Text>
                        <Icon name='caret-down' style={{ flex: 1 }} onPress={this.showPicker.bind(this, 'planOutTime', { date: new Date(), mode: 'spinner' })} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 10, fontSize: 14, flex: 1 }}>备注：</Text>
                    <TextInput underlineColorAndroid="transparent"
                        onChangeText={(text) => { this.setState({ remark: text }) }}
                        value={this.state.remark}
                        style={{ flex: 3, padding: 0, fontSize: 14 }} />
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={Actions.SelectStorage}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderColor: '#00cade', borderBottomWidth: 2 }}>
                            <Text style={{ color: 'red', flex: 1 }}>*</Text>
                            <Text style={{ color: '#00cade', fontSize: 16, flex: 4 }}>选择仓库</Text>
                            <Text style={{ color: '#00cade', fontSize: 16, flex: 10 }}>{this.state.storageName}</Text>
                            <Text style={{ fontSize: 14, flex: 1 }}>></Text>
                        </View>
                    </TouchableHighlight>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1, paddingVertical: 10,
                            marginLeft: 10, alignItems: 'center'
                        }}>
                            <Text style={{ fontSize: 16, flex: 4 }}>{this.state.row}</Text>
                            <Text style={{ fontSize: 16, flex: 1, color: '#00cade' }}>排</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, marginLeft: 10, alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, flex: 2 }}>{this.state.column}</Text>
                            <Text style={{ fontSize: 16, flex: 1, color: '#00cade' }}>道位</Text>
                        </View>
                    </View>
                    <View>
                        <Button full style={{ backgroundColor: '#00cade' }} onPress={() => { }}>
                            <Text style={{ color: '#ffffff', fontSize: 16, position: 'absolute', left: 20 }}>通过分布图选择车位</Text>
                            <Icon name='angle-right' color='#fff' size={16} style={{ position: 'absolute', right: 20 }} />
                        </Button>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                    <Button full style={{ backgroundColor: '#00cade' }} onPress={this.requestImportCar.bind(this)}>
                        <Text style={{ color: '#ffffff' }}>确定</Text>
                    </Button>
                </View>
            </View>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        car: state.ImporCarReducer,
        user: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    ImportCar: (param) => {
        dispatch(ImporCarAction.ImportCar(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCar)
