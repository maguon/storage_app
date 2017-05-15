import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default class RecordListItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { created_on, op, comment, vin } = this.props.recordItem
        created_on = new Date(created_on)
        let halfDay = created_on.getHours() >= 12 ? 'PM' : 'AM'
        let hour = created_on.getHours() >= 10 ? created_on.getHours() : `0${created_on.getHours()}`
        created_on = `${hour}:${created_on.getMinutes()}`

        let opImgUri = { uri: 'icon_note_in' }
        let textStyle
        if (op == '11') {
            op = '入库'
            opImgUri.uri = 'icon_note_in'
            textStyle = styles.inText
        }
        else if (op == '12') {
            op = '移位'
            opImgUri.uri = 'icon_note_move'
            textStyle = styles.moveText
        }
        else if (op == '13') {
            op = '出库'
            opImgUri.uri = 'icon_note_out'
            textStyle = styles.outText

        }

        let storageName = ''
        let row = ''
        let col = ''

        let regxStorageName = /storage (.*) parking at row (.*) column (.*)/
        if (regxStorageName.test(comment)) {
            storageName = RegExp.$1
            row = RegExp.$2
            col = RegExp.$3
        }

        return (
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 2, marginRight: 5, justifyContent: 'center' }}>
                    <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                        <Text style={textStyle}>{op}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                        <Text style={{ fontSize: 10, color: '#b3b3b3' }}>{halfDay}</Text>
                        <Text style={{ fontSize: 10, color: '#b3b3b3' }} > {created_on}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Image source={opImgUri} style={{ width: 25, height: 65 }} />
                </View>
                <View style={{ flex: 6, justifyContent: 'center' }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontWeight: 'bold' }}>{storageName}</Text>
                        <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>{col}-{row}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 10 }}>VIN码：</Text>
                        <Text style={{ fontSize: 10, marginLeft: 10 }}>{vin}</Text>
                    </View>
                </View>
            </View>
        )
    }
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