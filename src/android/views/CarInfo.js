/**
 * Created by rbyu on 2017/5/11.
 */
import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import * as CarInfoAction from '../../actions/CarInfoAction'

import CarInfoLayout from '../layout/CarInfo'



class CarInfo extends Component {
    constructor(props) {
        super(props)

        this.exportCar = this.exportCar.bind(this)
        this.getCarInfo = this.getCarInfo.bind(this)
        this.appendImage = this.appendImage.bind(this)
    }

    componentDidMount() {
        this.props.getCarInformation({
            requiredParam: {
                carId: this.props.car.id,
                userId: this.props.user.userId
            }
        })
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectType == 1) {
            let { row, column, storageName, storageId, parkingId } = nextProps
            console.log('nextProps', nextProps)
            this.props.moveCar({
                requiredParam: {
                    userId: this.props.user.userId,
                    parkingId: parkingId
                },
                optionalParam: {
                    carId: this.props.car.id
                }
            }, this.getCarInfo)
        }
    }


    getCarInfo() {
        this.props.getCarInformation({
            requiredParam: {
                carId: this.props.car.id,
                userId: this.props.user.userId
            }
        })
    }

    appendImage(param) {
        console.log(this.props.car)
        param.requiredParam = {
            userId: this.props.user.userId,
            carId: this.props.car.id,
            vin: this.props.car.vin
        }
        param.optionalParam = {
            imageType: 1
        }
        param.postFileParam.key = "image"

        param.postParam = {
            username: this.props.user.mobile,
            userId: this.props.user.userId,
            userType: this.props.user.userType
        }
        console.log('postImage', param)
        this.props.appendImage(param)
    }

    exportCar() {
        this.props.exportCar(
            {
                requiredParam: {
                    userId: this.props.user.userId,
                    relId: this.props.car.r_id,
                    relStatus: 2
                },
                putParam: {
                    parkingId: this.props.car.p_id,
                    storageId: this.props.car.storage_id,
                    carId: this.props.car.id
                }
            }
        )
    }

    render() {
        console.log('props', this.props)
        return (
            <CarInfoLayout
                car={this.props.carInformation.car}
                exportCar={this.exportCar}
                moveCar={this.moveCar}
                records={this.props.carInformation.recordList}
                images={this.props.carInformation.imageList}
                postImage={this.appendImage}
            />
        )
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.LoginReducer.user,
        carInformation: state.CarInfoReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarInformation: (param) => {
        dispatch(CarInfoAction.getCarInformation(param))
    },
    exportCar: (param) => {
        dispatch(CarInfoAction.exportCar(param))
    },
    moveCar: (param, getCarList) => {
        dispatch(CarInfoAction.moveCar(param, getCarList))
    },
    appendImage: (param) => {
        dispatch(CarInfoAction.appendImage(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarInfo)