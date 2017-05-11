import React, { Component } from 'react'
import { Text, View, TextInput, DrawerLayoutAndroid, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'


const window = Dimensions.get('window')

export default class AddCar extends Component {
    constructor(props) {
        super(props)
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

    render() {


        return (

            <DrawerLayoutAndroid
                ref='makeCarDraw'
                drawerWidth={window.width / 2}
                drawerPosition={DrawerLayoutAndroid.positions.Right}
                renderNavigationView={() => this.navigationView('makeCarDraw')}>
                <DrawerLayoutAndroid
                    ref='modelCarDraw'
                    drawerWidth={window.width / 2}
                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={() => this.navigationView('modelCarDraw')}>
                    <DrawerLayoutAndroid
                        ref='createDate'
                        drawerWidth={window.width / 2}
                        drawerPosition={DrawerLayoutAndroid.positions.Left}
                        renderNavigationView={() => this.navigationView('createDate')}>
                        <DrawerLayoutAndroid
                            ref='storage'
                            drawerWidth={window.width / 2}
                            drawerPosition={DrawerLayoutAndroid.positions.Left}
                            renderNavigationView={() => this.navigationView('storage')}>
                            <DrawerLayoutAndroid
                                ref='row'
                                drawerWidth={window.width / 2}
                                drawerPosition={DrawerLayoutAndroid.positions.Right}
                                renderNavigationView={() => this.navigationView('row')}>
                                <DrawerLayoutAndroid
                                    ref='col'
                                    drawerWidth={window.width / 2}
                                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                                    renderNavigationView={() => this.navigationView('col')}>
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
                                                <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dddddd' }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        flex: 1, paddingVertical: 10,
                                                        borderRightWidth: 1, borderColor: '#dddddd',
                                                        marginLeft: 10, alignItems: 'center'
                                                    }}>

                                                        <Text style={{ fontSize: 14, flex: 2 }}>品牌：</Text>
                                                        <Text style={{ fontSize: 14, flex: 2 }}>大众</Text>
                                                        <Icon name='caret-down' style={{ flex: 1 }} onPress={() => { this.openDraw('makeCarDraw') }} />
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, marginLeft: 10, alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 14, flex: 2 }}>型号：</Text>
                                                        <Text style={{ fontSize: 14, flex: 2 }}>帕萨特</Text>
                                                        <Icon name='caret-down' style={{ flex: 1 }} onPress={() => { this.openDraw('modelCarDraw') }} />
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>

                                                    <Text style={{ flex: 1, marginLeft: 10, fontSize: 14 }} onPress={() => { this.openDraw('modelCarDraw') }}>颜色：</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd', alignItems: 'center' }}>
                                                    <Text style={{ marginLeft: 10, fontSize: 14, flex: 1 }}>发动机号：</Text>
                                                    <TextInput underlineColorAndroid="transparent" style={{ flex: 3, padding: 0, fontSize: 12 }} />
                                                </View>
                                                <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                                                    <Text style={{ marginLeft: 10, fontSize: 14 }}>生产日期：</Text>
                                                </View>
                                            </View>
                                            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderColor: '#00cade', borderBottomWidth: 2 }}>
                                                    <Text style={{ color: '#00cade', fontSize: 16, flex: 10 }}>选择仓库</Text>
                                                    <Text style={{ color: '#00cade', fontSize: 16, flex: 5 }}>一号仓库</Text>
                                                    <Icon name='caret-down' style={{ flex: 1 }} onPress={() => { this.openDraw('storage') }} />
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        flex: 1, paddingVertical: 10,
                                                        marginLeft: 10, alignItems: 'center'
                                                    }}>
                                                        <Text style={{ fontSize: 16, flex: 4 }}>01</Text>
                                                        <Icon name='caret-down' style={{ flex: 1 }} onPress={() => { this.openDraw('row') }} />
                                                        <Text style={{ fontSize: 16, flex: 1, color: '#00cade' }}>排</Text>
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10, marginLeft: 10, alignItems: 'center' }}>
                                                        <Text style={{ fontSize: 16, flex: 2 }}>B2</Text>
                                                        <Icon name='caret-down' style={{ flex: 1 }} onPress={() => { this.openDraw('col') }} />
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
                                                <Button full style={{ backgroundColor: '#00cade' }} onPress={() => { }}>
                                                    <Text style={{ color: '#ffffff' }}>确定</Text>
                                                </Button>
                                            </View>
                                        </View>
                                    </DrawerLayoutAndroid>
                                </DrawerLayoutAndroid>
                            </DrawerLayoutAndroid>
                        </DrawerLayoutAndroid>
                    </DrawerLayoutAndroid>
                </DrawerLayoutAndroid>
            </DrawerLayoutAndroid>

        )
    }

}
