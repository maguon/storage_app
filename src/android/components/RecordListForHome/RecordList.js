import React, { Component } from 'react'
import { ScrollView, View, Text, Image } from 'react-native'
import Record from './RecordListHeader'


const RecordList = ({ recordList, isHome = true }) => {
    let records = recordList
        .reduce((acc, val) => {
            let obj = acc.find((item) => {
                return new Date(item.created_on).toLocaleDateString() == new Date(val.created_on).toLocaleDateString()
            })
            if (obj) {
                obj.data.push(val)
            } else {
                acc.push({ created_on: val.created_on, key: acc.length, data: [val] })
            }
            return acc
        }, [])
        .sort((a, b) => {
            return a.created_on < b.created_on
        })
        .map((item) => {
            return <Record record={item} key={item.key} />
        })

    let header = isHome ? (<View style={{ marginLeft: 10, marginRight: 10, marginTop: 10, paddingBottom: 10, flexDirection: 'row', borderBottomWidth: 1, borderColor: '#00bfd8' }}>
        <Image source={{ uri: 'icon_notes' }} style={{ width: 20, height: 20 }} />
        <Text style={{ marginLeft: 10 }}>工作记录</Text>
    </View>)
        : (<View ></View >)

    return (
        <View >
            {header}
            <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                {records}
            </View>
        </View >
    )
}


export default RecordList