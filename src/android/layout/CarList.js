import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Car from '../components/CarList/CarListItem'
import { Actions } from 'react-native-router-flux'
import SearchBar from '../components/Bar/SearchBar'
import CarListComponent from '../components/CarList/CarList'
import Loading from '../components/Loading/Loading'

const window = Dimensions.get('window')

const CarList = ({isLoading,cars, getCarList, loadMore }) => {
    let viewStyle = { backgroundColor: '#00cade' }
    return (
        <View style={{ flex: 1, width: window.width }}>
            <Loading isLoading={isLoading} />
            <SearchBar viewStyle={viewStyle} />
            <CarListComponent 
            cars={cars}
            getCarList={getCarList}
            loadMore={loadMore} />
        </View>
    )
}

export default CarList
