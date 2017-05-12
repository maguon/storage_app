import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, Image } from 'react-native'
import NavBar from '../components/Bar/NavBar'
import CarInfoComponent from '../components/CarInfo'
import CarCamera from '../components/CarCamera'
import RecordList from '../components/RecordListForCarInfo/RecordList'

const window = Dimensions.get('window')

const CarInfo = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <NavBar title={'车辆详情'} />
            <ScrollView>
                <CarInfoComponent
                    car={props.car}
                    exportCar={props.exportCar}
                    moveCar={props.moveCar} />
                <CarCamera />
                <RecordList
                    records={props.records}
                    getRecordLisMore={props.getRecordLisMore} />
            </ScrollView>
        </View>
    )
}

export default CarInfo

