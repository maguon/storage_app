import React, { Component } from 'react'
import { 
    View,
    StyleSheet } from 'react-native'
import StoragePannel from './StorageListItem'
import { Container, Text, List, ListItem } from 'native-base'


export default class StoragesPannelList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.storages)
        let storages = this.props.storages.map((item) => {
            return <StoragePannel storage={item} key={item.id} />
        })
        return (
            <View style={styles.container}>
              <View style={{marginBottom: 10}}>
                    {storages}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eeeeee'       
    }
})

