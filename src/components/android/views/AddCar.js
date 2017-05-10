import React, { Component } from 'react'
import { Text, View ,TextInput,Picker,Button} from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/NavBar'

export default class AddCar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'车辆入库'} />
                <View  style={{ marginVertical: 10, marginHorizontal: 20 }}>
                    <View style={{ paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd',flexDirection:'row'}}>
                        <Text style={{ color: '#00cade', marginLeft: 10, fontSize: 18,flex:1 }}>VIN码：</Text>
                        <TextInput style={{flex:3}}/>
                    </View>
                    <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#dddddd' }}>
                        <View style={{
                            flex: 1, paddingVertical: 10,
                            //borderRightWidth: 1, borderColor: '#dddddd', 
                            marginLeft: 10
                        }}>
                            <Text style={{ fontSize: 12 }}>品牌：</Text>
                            <Picker />
                        </View>
                        <View style={{ flex: 1, paddingVertical: 10, marginLeft: 10 }}>
                            <Text style={{ fontSize: 12 }}>型号：</Text>
                            <Picker />
                        </View>
                    </View>
                    <View style={{  paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                        <Text style={{ marginLeft: 10, fontSize: 12 }}>颜色：</Text>
                        <Picker />
                        {/*<View style={{ width: 20, height: 20, borderColor: '#dddddd', borderWidth: 1, alignSelf: 'center', right: 0, position: 'absolute' }}></View>*/}
                    
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                        <Text style={{ marginLeft: 10, fontSize: 12 }}>发动机型号：</Text>
                    </View>
                    <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#dddddd' }}>
                        <Text style={{ marginLeft: 10, fontSize: 12 }}>生产日期：</Text>
                    </View>
                </View>
                <View>
                    <View>
                        <Text>选择仓库</Text>
                        <Picker />
                        </View>
                        <View>
                            <Picker />
                            <Text>排</Text>
                                                    <Picker />
                            <Text>道位</Text>
                            </View>
                            <Button onPress={()=>{}} title='通过分布图选择车位'/>
                </View>
                <View>
                     <Button onPress={()=>{}} title='确定'/>
                </View>

            </View>
        )
    }

}
