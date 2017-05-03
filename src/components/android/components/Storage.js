import React, { Component } from 'react'
import { View } from 'react-native'
import { Text, ListItem } from 'native-base'


export default class Storage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { storage } = this.props
        
        let count = storage.row * storage.col
        return (
            <View>
                <ListItem >
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <Text>图片</Text>
                            <Text style={{ color: 'red' }}>{storage.storage_name}</Text>
                            <Text>车位总数:{count}</Text>
                            <Text style={{ color: 'red' }}>剩余车位:{storage.pCount}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ color: 'red' }}>今日入库:{storage.imports}</Text>
                            <Text>今日出库:{storage.exports}</Text>
                        </View>
                    </View>

                </ListItem >
            </View>

        )

    }

}