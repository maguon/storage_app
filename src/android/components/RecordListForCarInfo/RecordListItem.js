/**
* Created by rbyu on 2017/5/11.
*/
import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import { Button, Icon } from 'native-base'

const RecordListItem = ({ record }) => {
    let created_on = (new Date(record.created_on)).toLocaleString()

    let textStyle
    if (record.op == '11') {
        record.op = '入库'
        textStyle = styles.inText
    }
    else if (record.op == '12') {
        record.op = '移位'

        textStyle = styles.moveText
    }
    else if (record.op == '13') {
        record.op = '出库'

        textStyle = styles.outText

    }

    let storageName = ''
    let row = ''
    let col = ''

    let regxStorageName = /storage (.*) parking at row (.*) column (.*)/
    if (regxStorageName.test(record.comment)) {
        storageName = RegExp.$1
        row = RegExp.$2
        col = RegExp.$3
    }
    return (

        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
            <Text style={{ flex: 7, fontSize: 12 }}>{created_on}</Text>
            <Text style={[{ flex: 2, fontSize: 12 }, textStyle]}>{record.op}</Text>
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