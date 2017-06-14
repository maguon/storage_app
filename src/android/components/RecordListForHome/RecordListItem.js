import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { Actions } from 'react-native-router-flux'

export default class RecordListItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { created_on, op, comment, vin, id, _id } = this.props.recordItem
        created_on = (new Date(created_on)).toLocaleTimeString()

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

        return (
            <TouchableHighlight key={_id} underlayColor='rgba(0,0,0,0.1)' onPress={() => {
                
                Actions.carInfo({ carId: id })
            }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 2, marginRight: 5, justifyContent: 'center' }}>
                        <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                            <Text style={textStyle}>{op}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                            <Text style={{ fontSize: 10, color: '#b3b3b3' }} > {created_on}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Image source={opImgUri} style={{ width: 25, height: 65 }} />
                    </View>
                    <View style={{ flex: 6, justifyContent: 'center' }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontWeight: 'bold' }}>vin：</Text>
                            <Text style={{ fontWeight: 'bold' }}>{vin}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 10 }}>{comment}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
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