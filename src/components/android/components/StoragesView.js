import React, { Component } from 'react'
import { View } from 'react-native'
import Storage from './Storage'
import { Container, Text, List, ListItem } from 'native-base'

export default class StoragesView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <List>
                    <Storage />
                </List>
            </View>

        )

    }

}