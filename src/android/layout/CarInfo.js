import React, { Component } from 'react'
import { Text, View, Dimensions, ScrollView, Image } from 'react-native'
import NavBar from '../components/Bar/NavBar'
import CarInfoComponent from '../components/CarInfo'
import CarEdit from '../components/CarEdit'
import CarCamera from '../components/CarCamera'
import RecordList from '../components/RecordListForCarInfo/RecordList'
import Loading from '../components/Loading/Loading'

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
            {/*<Loading isLoading={records.isLoading}/>*/}
            <NavBar title={'车辆详情'} />
            <ScrollView>
                {_CarInfoComponent}
                <CarCamera images={images} postImage={postImage} />
                <RecordList
                    records={records}
                />
            </ScrollView>
        </View>
    )
}

export default CarInfo

