import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import Parking from '../components/StorageList/StorageListItem'
import { Actions } from 'react-native-router-flux'
import NavBar from '../components/Bar/NavBar'
import { Button, Icon } from 'native-base'
import CarInfoComponent from '../components/CarInfo'
import CarCamera from '../components/CarCamera'
import RecordList from '../components/RecordListForCarInfo/RecordList'

const window = Dimensions.get('window')

const CarInfo = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <NavBar title={'车辆详情'} />
            <ScrollView>
                <CarInfoComponent {...props} />
                <CarCamera />
                <RecordList />
            </ScrollView>
        </View>
    )
}

export default CarInfo