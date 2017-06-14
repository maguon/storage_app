import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, Image } from 'react-native'
import NavBar from '../components/Bar/NavBar'
import CarInfoComponent from '../components/CarInfo/CarInfo'
import CarEdit from '../components/CarInfo/CarEdit'
import CarImportAgain from '../components/CarInfo/CarImportAgain'
import CarCamera from '../components/CarCamera/CarCamera'
import RecordList from '../components/RecordListForCarInfo/RecordList'
import ConfirmModal from '../components/ConfirmModal'
import { Actions } from 'react-native-router-flux'

const window = Dimensions.get('window')

const CarInfo = ({ car,
    exportCar,
    moveCar,
    records,
    images,
    postImage,
    changeViewType,
    viewType,
    editCarInfo,
    confirmModalVisible,
    onPressOk,
    onPressCancel,
    updateCarInfo,
    changeParkingForImportAgain,
    changePlanOutTimeForImportAgain,
    importAgain,
    importAgainCar,
    changeEditCarInfoField
 }) => {
    let _CarInfoComponent
    if (viewType == 0) {
        _CarInfoComponent = <CarInfoComponent
            car={car}
            exportCar={exportCar}
            moveCar={moveCar}
            changeViewType={changeViewType} />
    } else if (viewType == 1) {
        _CarInfoComponent = <CarEdit
            car={editCarInfo}
            changeViewType={changeViewType}
            updateCarInfo={updateCarInfo}
            changeEditCarInfoField={changeEditCarInfoField}
        />
    } else if (viewType == 2) {
        _CarInfoComponent = <CarImportAgain
            changeParkingForImportAgain={changeParkingForImportAgain}
            changePlanOutTimeForImportAgain={changePlanOutTimeForImportAgain}
            importAgainCar={importAgainCar}
            changeViewType={changeViewType}
            importAgain={importAgain}
        />
    }

    return (
        <View style={{ flex: 1 }}>
            <NavBar title={'车辆详情'} />
            <ScrollView>
                {_CarInfoComponent}
                <CarCamera images={images} postImage={postImage} showImagePage={Actions.ImagePageForCarInfo}/>
                <RecordList
                    records={records}
                />
            </ScrollView>
            <ConfirmModal
                title='确认出库？'
                isVisible={confirmModalVisible}
                onPressOk={onPressOk}
                onPressCancel={onPressCancel} />
        </View>
    )
}

export default CarInfo

