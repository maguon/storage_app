import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as StorageAction from '../../../actions/StorageDateAction'
import StorageListItem from './StorageListItem'
import { Actions } from 'react-native-router-flux'
import SearchBar from '../Bar/SearchBar'

const StorageList = ({storages}) => {


    storages = storages.map(item =>
        <StorageListItem 
            storage={item}
            key={item.id}
            />)
    return (
            <ScrollView >
                {storages}
            </ScrollView>
    )
}

export default StorageList