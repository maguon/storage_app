import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, Image } from 'react-native'
import NavBar from '../components/Bar/NavBar'
import CarInfoComponent from '../components/CarInfo/CarInfo'
import CarEdit from '../components/CarInfo/CarEdit'
import CarImportAgain from '../components/CarInfo/CarImportAgain'
import CarCamera from '../components/CarCamera/CarCamera'
import RecordList from '../components/RecordListForCarInfo/RecordList'
import ConfirmModal from '../components/ConfirmModal'

const window = Dimensions.get('window')

const CarInfo = ({ car,
    exportCar,
    moveCar,
    records,
    images,
    postImage,
    changeViewType,
    viewType,
    changeEditCarInfoModel,
    changeEditCarInfoColor,
    changeEditCarInfoRemark,
    changeEditCarInfoProDate,
    changeEditCarInfoPlanOutTime,
    changeEditCarInfoEngineNum,
    editCarInfo,
    confirmModalVisible,
    onPressOk,
    onPressCancel,
    updateCarInfo,
    changeParkingForImportAgain,
    changePlanOutTimeForImportAgain,
    importAgain,
    importAgainCar }) => {
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
            exportCar={exportCar}
            moveCar={moveCar}
            changeViewType={changeViewType}
            updateCarInfo={updateCarInfo}
            changeEditCarInfoModel={changeEditCarInfoModel}
            changeEditCarInfoColor={changeEditCarInfoColor}
            changeEditCarInfoRemark={changeEditCarInfoRemark}
            changeEditCarInfoProDate={changeEditCarInfoProDate}
            changeEditCarInfoPlanOutTime={changeEditCarInfoPlanOutTime}
            changeEditCarInfoEngineNum={changeEditCarInfoEngineNum}
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
                <CarCamera images={images} postImage={postImage} />
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

