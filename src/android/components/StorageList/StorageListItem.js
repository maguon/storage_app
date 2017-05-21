import React, { Component } from 'react'
import { Text, View, Button, Image, TouchableHighlight, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from 'react-native-router-flux'

const StorageListItem = ({ storage }) => {
    return (
        <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={() => { }}>
            <View style={styles.container}>
                <View style={[{ flex: 3 }, styles.content]}>
                    <View style={styles.contentIcon}>
                        <Icon name='home' size={20} color='#00cade' />
                    </View>
                </View>
                <View style={[{ flex: 8 }, styles.content]}>
                    <Text style={styles.storageName}>{storage.storage_name}</Text>
                </View>
                <View style={[{ flex: 8 }, styles.content]}>
                    <View>
                        <Text style={styles.pCountTag}>剩余车位：</Text>
                    </View>
                    <View>
                        <Text style={styles.pCount}>{storage.pCount.toString()}</Text>
                    </View>
                </View>
                <View style={[{ flex: 1 }, styles.content]}>
                    <Text style={styles.contentAction}>></Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: '#f8f8f8',
        borderColor: '#e1e1e1',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    contentIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    storageName: {
        fontSize: 18,
        color: '#8b8b8b'
    },
    pCountTag: {
        fontSize: 13, color: '#bfbfbf'
    },
    pCount: {
        fontSize: 13, color: '#f7656a'
    },
    contentAction: {
        fontSize: 18, color: '#c2c2c2'
    }

})

export default StorageListItem