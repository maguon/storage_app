import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, Image } from 'react-native'
import NavBar from '../components/Bar/NavBar'
import CarInfoComponent from '../components/CarInfo'
import CarCamera from '../components/CarCamera'
import RecordList from '../components/RecordListForCarInfo/RecordList'
import Loading from '../components/Loading/Loading'

const window = Dimensions.get('window')

const CarInfo = ({ car, exportCar, moveCar, records, images, postImage }) => {
    return (
        <View style={{ flex: 1 }}>
            {/*<Loading isLoading={records.isLoading}/>*/}
            <NavBar title={'车辆详情'} />
            <ScrollView>
                <CarInfoComponent
                    car={car}
                    exportCar={exportCar}
                    moveCar={moveCar} />
                <CarCamera images={images} postImage={postImage} />
                <RecordList
                    records={records}
                />
            </ScrollView>
        </View>
    )
}

export default CarInfo

