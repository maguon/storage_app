import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import SearchBar from '../components/Bar/SearchBar'
import StorageListComponent from '../components/StorageList/StorageList'
import Loading from '../components/Loading/Loading'

const StorageList = ({ storages, isLoading, changeTab }) => {
    let viewStyle = { backgroundColor: '#00cade' }
    return (
        <View style={{ flex: 1 }}>
            <Loading isLoading={isLoading} />
            <SearchBar viewStyle={viewStyle} />
            <StorageListComponent
                storages={storages}
            />
        </View>
    )
}

export default StorageList