import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, Image } from 'react-native'
import NavBar from '../components/Bar/NavBar'
import CarInfoComponent from '../components/CarInfo'
import CarEdit from '../components/CarEdit'
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
    isEdit,
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
    updateCarInfo }) => {
    let _CarInfoComponent = isEdit ?
        <CarEdit
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
        /> :
        <CarInfoComponent
            car={car}
            exportCar={exportCar}
            moveCar={moveCar}
            changeViewType={changeViewType} />

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

