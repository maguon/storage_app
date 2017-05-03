import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { connect } from 'react-redux'
import Footer from '../components/Footer'
import Parking from '../components/Parking'
import { Container } from 'native-base'
import { Scene, Actions } from 'react-native-router-flux';

export default class CarInfo extends Component {
    constructor(props) {
        super(props)
    }

    upload(){

    }
    move(){

    }
    output(){

    }

    render() {
        let { car } = this.props

        return (
            <View>
                <Text>VIN码：{car.vin}</Text>
                <Text>品牌：{car.make_name}</Text>
                <Text>型号：{car.model_name}</Text>
                <Text>发动机型号：{car.engine_num}</Text>
                <Text>颜色：{car.colour}</Text>
                <Text>生产日期：{car.pro_date}</Text>
                <Text>当前位置：{car.storage_name}-{car.row}-{car.col}</Text>
                <Button 
                onPress={this.upload.bind(this)}
                title='上传照片'/>
                <Text>存储记录：</Text>

                <Button 
                onPress={this.move.bind(this)}
                title='移位'/>
                <Button 
                onPress={this.output.bind(this)}
                title='出库'/>
            </View>
        )
    }

}