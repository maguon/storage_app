import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Car from '../components/CarList/CarListItem'
import { Actions } from 'react-native-router-flux'
import SearchBar from '../components/Bar/SearchBar'
import CarListComponent from '../components/CarList/CarList'
import NavSearchBar from '../components/Bar/NavSearchBar'

const window = Dimensions.get('window')

const CarList = ({ cars, searchCarListMore, searchVin, changeSearchVin, searchCarList }) => {
    return (
        <View style={{ flex: 1, width: window.width }}>
            <NavSearchBar
                searchVin={searchVin}
                changeSearchVin={changeSearchVin}
                searchCarList={searchCarList}
            />
            <CarListComponent
                cars={cars}
                searchCarListMore={searchCarListMore} />
        </View>
    )
}

export default CarList
