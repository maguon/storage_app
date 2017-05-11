import React, { Component } from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Car from '../components/CarList/CarListItem'
import * as CarAction from '../../../actions/CarAction'
import { Actions } from 'react-native-router-flux'
import SearchBar from '../components/Bar/SearchBar'
import CarListComponent from '../components/CarList/CarList'


const window = Dimensions.get('window')

const CarList = ({cars}) => {
    let viewStyle = { backgroundColor: '#00cade' }
    return (
        <View style={{ flex: 1, width: window.width }}>
            <SearchBar viewStyle={viewStyle} />
            <CarListComponent cars={cars}/>
        </View>
    )
}

export default CarList
