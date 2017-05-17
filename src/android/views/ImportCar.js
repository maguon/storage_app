import React, { Component } from 'react'
import { Text, View, TextInput, DrawerLayoutAndroid, Dimensions, DatePickerAndroid, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as CarMakeAction from '../../actions/CarMakeAction'
import * as CarModelAction from '../../actions/CarModelAction'
import * as colorList from '../../config/ColorList.json'
import { Actions } from 'react-native-router-flux'


const window = Dimensions.get('window')

class ImportCar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            presetDate: new Date(2016, 3, 5),
            allDate: new Date(2020, 4, 5),
            simpleText: '',
            minText: '选择日期,不能比今日再早',
            maxText: '选择日期,不能比今日再晚',
            presetText: '选择日期,指定2016/3/5',
            carMakeName: '',
            carMakeId: -1,
            carModelName: '',
            carModelId: -1,
            selectedColor: 'FFFFFF',
            row: '',
            column: '',
            storageName: '',
            storageId: 0
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps)
        if (nextProps.selectType == 0) {
            let { makeId, modelId, makeName, modelName } = nextProps
            this.setState({
                carMakeId: makeId,
                carModelId: modelId,
                carMakeName: makeName,
                carModelName: `(${modelName})`
            })
        } else if (nextProps.selectType == 1) {
            let { row, column, storageName, storageId } = nextProps
            this.setState({
                row,
                column,
                storageName,
                storageId
            })
        }

    }


    openDraw(tag) {
        this.refs[tag].openDrawer()
    }

    navigationView(tag) {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>{tag}</Text>
            </View>
        )
    }

    colorPanelRender() {
        let colorPanel = colorList.list.map(item => {
            if (this.state.selectedColor != item.colorId)
                return (<TouchableHighlight key={item.colorName} underlayColor='rgba(0,0,0,0.1)' onPress={() => { this.setState({ selectedColor: item.colorId }) }}>
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
            var newState = {}
            const { action, year, month, day } = await DatePickerAndroid.open(options)
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed'
            } else {
                var date = new Date(year, month, day);
                newState[stateKey + 'Text'] = date.toLocaleDateString()
                newState[stateKey + 'Date'] = date
            }
            this.setState(newState)

        } catch ({ code, message }) {
            console.warn(`Error in example '${stateKey}': `, message)
        }
    }

    render() {
        return (
            <DrawerLayoutAndroid
                ref='parkingView'
                drawerWidth={window.width}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => this.navigationView('parkingView')}>
                <View style={{ flex: 1 }}>
                    <NavBar title={'车辆入库'} />
                    <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                        <View style={{ paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd', flexDirection: 'row' }}>
                            <Text style={{ color: '#00cade', marginLeft: 10, fontSize: 18, flex: 1 }}>VIN码：</Text>
                            <TextInput underlineColorAndroid="transparent" style={{ flex: 3, padding: 0, color: '#00cade', fontSize: 18 }} />
                        </View>
                        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={Actions.SelectCarMake}>
                            <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dddddd', paddingVertical: 10, marginLeft: 10 }}>
                                <Text style={{ fontSize: 14, flex: 4 }}>品牌(型号)：</Text>
                                <Text style={{ fontSize: 14, flex: 10 }}>{this.state.carMakeName}{this.state.carModelName}</Text>
                                <Text style={{ fontSize: 14, flex: 1 }}>></Text>
                            </View>
                        </TouchableHighlight>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                            <Text style={{ flex: 1, marginLeft: 10, fontSize: 14 }}>颜色：</Text>
                            {this.colorPanelRender()}
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd', alignItems: 'center' }}>
                            <Text style={{ marginLeft: 10, fontSize: 14, flex: 1 }}>发动机号：</Text>
                            <TextInput underlineColorAndroid="transparent" style={{ flex: 3, padding: 0, fontSize: 14 }} />
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                            <Text style={{ marginLeft: 10, fontSize: 14, flex: 2 }}>生产日期：</Text>
                            <Text style={{ fontSize: 14, flex: 5 }}>{this.state.simpleText}</Text>
                            <Icon name='caret-down' style={{ flex: 1 }} onPress={this.showPicker.bind(this, 'simple', { date: this.state.simpleDate })} />
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderColor: '#00cade', borderBottomWidth: 2 }}>
                            <Text style={{ color: '#00cade', fontSize: 16, flex: 10 }}>选择仓库</Text>
                            <Text style={{ color: '#00cade', fontSize: 16, flex: 5 }}>{this.state.storageName}</Text>
                            <Text style={{ fontSize: 14, flex: 1 }}>></Text>
                        </View>
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
                            <Button full style={{ backgroundColor: '#00cade' }} onPress={() => { this.openDraw('parkingView') }}>
                                <Text style={{ color: '#ffffff', fontSize: 16, position: 'absolute', left: 20 }}>通过分布图选择车位</Text>
                                <Icon name='angle-right' color='#fff' size={16} style={{ position: 'absolute', right: 20 }} />
                            </Button>
                        </View>
                    </View>
                    <View style={{ marginHorizontal: 20, marginTop: 40 }}>
                        <Button full style={{ backgroundColor: '#00cade' }} onPress={() => Actions.SelectStorage()}>
                            <Text style={{ color: '#ffffff' }}>确定</Text>
                        </Button>
                    </View>
                </View>
            </DrawerLayoutAndroid>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        user: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ImportCar)
