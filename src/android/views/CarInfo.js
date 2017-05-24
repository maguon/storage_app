/**
 * Created by rbyu on 2017/5/11.
 */
import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import * as CarInfoAction from '../../actions/CarInfoAction'
import * as CarAction from '../../actions/CarAction'
import { Actions } from 'react-native-router-flux'
import CarInfoLayout from '../layout/CarInfo'

class CarInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moveFlag: false
        }
        this.exportCar = this.exportCar.bind(this)
        this.getCarInfo = this.getCarInfo.bind(this)
        this.appendImage = this.appendImage.bind(this)
        this.moveCar = this.moveCar.bind(this)
    }

    componentDidMount() {
        this.props.getCarInformation({
            requiredParam: {
                userId: this.props.user.userId,
                carId: this.props.carId
            },
            optionalParam: {
                active: 1,
                relStatus: 1,
                carId: this.props.carId
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectType == 1 && this.state.moveFlag) {
            let { row, column, storageName, storageId, parkingId } = nextProps
            console.log('nextProps', nextProps)
            this.props.moveCar({
                requiredParam: {
                    userId: this.props.user.userId,
                    parkingId: parkingId
                },
                optionalParam: {
                    carId: this.props.carId
                }
            }, this.getCarInfo)
            this.setState({ moveFlag: false })
        }
    }

    getCarInfo() {
        this.props.getCarInformation({
            requiredParam: {
                carId: this.props.carId,
                userId: this.props.user.userId
            },
            optionalParam: {
                active: 1,
                relStatus: 1,
                carId: this.props.carId
            }
        })
    }

    moveCar() {
        this.setState({ moveFlag: true })
        Actions.SelectRow({
            storageId: this.props.carInformation.car.storage_id,
            storageName: this.props.carInformation.car.storage_name,
            _popNum: 2,
            chageParkingId: (param) => this.props.moveCar({
                requiredParam: {
                    parkingId: param.parkingId,
                    userId: this.props.user.userId
                }, optionalParam: {
                    carId: this.props.carId
                }
            }, this.getCarInfo)
        })
    }

    appendImage(param) {
        console.log('car', this.props.carInformation.car)
        console.log('props', this.props)
        param.requiredParam = {
            userId: this.props.user.userId,
            carId: this.props.carId,
            vin: this.props.carInformation.car.vin
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
                    relId: this.props.carInformation.car.r_id,
                    relStatus: 2
                },
                putParam: {
                    parkingId: this.props.carInformation.car.p_id,
                    storageId: this.props.carInformation.car.storage_id,
                    carId: this.props.carId
                }
            }, () => this.props.removeCar(this.props.carId)
        )
    }

    render() {
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
    exportCar: (param, removeCar) => {
        dispatch(CarInfoAction.exportCar(param, removeCar))
    },
    moveCar: (param, getCarInfo) => {
        dispatch(CarInfoAction.moveCar(param, getCarInfo))
    },
    appendImage: (param) => {
        dispatch(CarInfoAction.appendImage(param))
    },
    removeCar: (carId) => {
        dispatch(CarAction.removeCar(carId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarInfo)