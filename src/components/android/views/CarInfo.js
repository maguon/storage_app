import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import Parking from '../components/StorageList/StorageListItem'
import { Actions } from 'react-native-router-flux'
import NavBar from '../components/Bar/NavBar'
import { Button, Icon } from 'native-base'


const window = Dimensions.get('window')

export default class CarInfo extends Component {
    constructor(props) {
        super(props)
    }

    upload() {

    }
    move() {

    }
    output() {

    }

    render() {
        let { car } = this.props

        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'车辆详情'} />
                <ScrollView>
                    <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                        <View style={{ paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                            <Text style={{ color: '#00cade', marginLeft: 10,fontSize:18 }}>VIN码：{car.vin}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dddddd' }}>
                            <View style={{ flex: 1, paddingVertical: 10, 
                            //borderRightWidth: 1, borderColor: '#dddddd', 
                            marginLeft: 10 }}>
                                <Text style={{ fontSize:14 }}>品牌：{car.make_name}</Text>
                            </View>
                            <View style={{ flex: 1, paddingVertical: 10, marginLeft: 10 }}>
                                <Text  style={{ fontSize:14 }}>型号：{car.model_name}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                            <Text style={{ marginLeft: 10, fontSize:14  }}>颜色：{car.colour}</Text>
                            <View style={{ width: 20, height: 20, borderColor: '#dddddd', borderWidth: 1, alignSelf: 'center', backgroundColor: `#${car.colour}`, right: 0, position: 'absolute' }}></View>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                            <Text style={{ marginLeft: 10 , fontSize:14}}>发动机型号：{car.engine_num}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                            <Text style={{ marginLeft: 10 , fontSize:14}}>生产日期：{car.pro_date}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                            <Text style={{ marginLeft: 10, fontSize:14 }}>当前位置：{car.storage_name}-{car.row}-{car.col}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20 }} >
                        <View style={{ flex: 1, marginRight: 10 }}>
                            <Button
                                full
                                style={{ backgroundColor: '#00cade', borderRadius: 5 }}
                                onPress={this.move.bind(this)}>
                                <Text style={{ color: '#ffffff' }}>移位</Text>
                            </Button>
                        </View >
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Button
                                full
                                style={{ backgroundColor: '#00cade', borderRadius: 5 }}
                                onPress={this.output.bind(this)}>
                                <Text style={{ color: '#ffffff' }}>出库</Text>
                            </Button>
                        </View>
                    </View>

                    <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
                        <View style={{ flexDirection: 'row', paddingBottom: 10, borderColor: '#dddddd', borderBottomWidth: 1 }}>
                            <View>
                                <Image source={{ uri: 'icon_notes' }} style={{ width: 20, height: 20 }} />
                            </View>
                            <View style={{ marginLeft: 10 }}>
                                <Text>操作记录</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                <Text style={{ flex: 5, fontSize: 12 }}>2017-03-16 11:30</Text>
                                <Text style={{ flex: 2, fontSize: 12,color:'#00cade' }}>入库</Text>
                                <Text style={{ flex: 5, fontSize: 12 }}>至一号仓库B-12</Text>
                                <Text style={{ flex: 3, fontSize: 12 }}>王大大</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                <Text style={{ flex: 5, fontSize: 12 }}>2017-03-16 11:30</Text>
                                <Text style={{ flex: 2, fontSize: 12 ,color:'#ffa700'}}>移位</Text>
                                <Text style={{ flex: 5, fontSize: 12 }}>至一号仓库B-12</Text>
                                <Text style={{ flex: 3, fontSize: 12 }}>王大大</Text>
                            </View>
                            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                                <Text style={{ flex: 5, fontSize: 12 }}>2017-03-16 11:30</Text>
                                <Text style={{ flex: 2, fontSize: 12 ,color:'#f7656a'}}>出库</Text>
                                <Text style={{ flex: 5, fontSize: 12 }}>至一号仓库B-12</Text>
                                <Text style={{ flex: 3, fontSize: 12 }}>王大大</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}