/**
* Created by rbyu on 2017/5/11.
*/
import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { Button, Icon } from 'native-base'

const CarCamera = ({record}) => {
    return (

        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <Text style={{ flex: 5, fontSize: 12 }}>2017-03-16 11:30</Text>
            <Text style={{ flex: 2, fontSize: 12, color: '#00cade' }}>入库</Text>
            <Text style={{ flex: 5, fontSize: 12 }}>至一号仓库B-12</Text>
            <Text style={{ flex: 3, fontSize: 12 }}>王大大</Text>
        </View>
    )
}

export default CarCamera