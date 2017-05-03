import React, { Component } from 'react'
import { View } from 'react-native'
import Storage from './Storage'
import { Container, Text, List, ListItem } from 'native-base'

export default class StoragesView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        
        let storages =this.props.storages.map((item)=>{
            return <Storage  storage={item} key={item.id}/>
        })
        return (
            <View>
                <List>
                    {storages}
                </List>
            </View>

        )

    }

}