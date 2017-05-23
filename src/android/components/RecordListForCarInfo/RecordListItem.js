/**
* Created by rbyu on 2017/5/11.
*/
import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import { Button, Icon } from 'native-base'

const RecordListItem = ({ record }) => {

    //console.log('record', record)
    let created_on = (new Date(record.timez)).toLocaleString()

    let textStyle
    let op
    if (record.op == '11') {
        op = '入库'
        textStyle = styles.inText
    }
    else if (record.op == '12') {
        op = '移位'
        textStyle = styles.moveText
    }
    else if (record.op == '13') {
        op = '出库'
        textStyle = styles.outText
    }

    let storageName = ''
    let row = ''
    let col = ''

    let regxStorageName = /storage (.*) parking at row (.*) column (.*)/
    if (regxStorageName.test(record.content)) {
        storageName = RegExp.$1
        row = RegExp.$2
        col = RegExp.$3
    }
    return (

        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <Text style={{ flex: 7, fontSize: 12 }}>{created_on}</Text>
            <Text style={[{ flex: 2, fontSize: 12 }, textStyle]}>{op}</Text>
            <Text style={{ flex: 5, fontSize: 12 }}>至{storageName}{row}-{col}</Text>
            <Text style={{ flex: 2, fontSize: 12 }}>{record.username}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    inText: {
        color: '#00bfd8'
    },
    outText: {
        color: '#f7666b'
    },
    moveText: {
        color: '#ffa700'
    }
})

export default RecordListItem