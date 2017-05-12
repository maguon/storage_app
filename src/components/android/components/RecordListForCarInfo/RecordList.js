/**
 * Created by rbyu on 2017/5/11.
 */
import React, { Component } from 'react'
import { Text, View, Dimensions, Image } from 'react-native'
import { Button, Icon } from 'native-base'
import RecordListItem from './RecordListItem'


const window = Dimensions.get('window')


const CarCamera = () => {
    return (
        <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', paddingBottom: 10, borderColor: '#dddddd', borderBottomWidth: 1 }}>
                <View>
                    <Image source={{ uri: 'icon_notes' }} style={{ width: 20, height: 20 }} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Text>操作记录</Text>
                </View>
            </View>
            <RecordListItem />
        </View>)
}

export default CarCamera