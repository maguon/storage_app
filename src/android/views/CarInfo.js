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
        this.exportCar = this.exportCar.bind(this)
        this.getCarInfo = this.getCarInfo.bind(this)
        this.appendImage = this.appendImage.bind(this)
        this.moveCar = this.moveCar.bind(this)
    }

    componentDidMount() {
        this.getCarInfo()
    }

    getCarInfo() {
        this.props.getCarInfo({
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

    componentWillReceiveProps(nextProps) {
        // if (nextProps.selectType == 1 && this.state.moveFlag) {
        //     let { row, column, storageName, storageId, parkingId } = nextProps
        //     console.log('nextProps', nextProps)
        //     this.props.moveCar({
        //         requiredParam: {
        //             userId: this.props.user.userId,
        //             parkingId: parkingId
        //         },
        //         optionalParam: {
        //             carId: this.props.carId
        //         }
        //     }, this.getCarInfo)
        //     this.setState({ moveFlag: false })
        // }
    }

    moveCar() {
        let { storage_id, storage_name } = this.props.CarInfoReducer.getCarInfo.data.car
        let { userId } = this.props.user
        let { carId, moveCar } = this.props
        Actions.SelectRow({
            storageId: storage_id,
            storageName: storage_name,
            _popNum: 2,
            chageParkingId: (param) => moveCar({
                requiredParam: {
                    parkingId: param.parkingId,
                    userId: userId
                }, optionalParam: {
                    carId: carId
                }
            }, this.getCarInfo)
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { CarInfoReducer, removeCar, resetExportCar } = nextProps
        let { carId } = this.props
        // console.log(CarInfoReducer)
        if (CarInfoReducer.exportCar.isExecStatus == 0) {
            console.log('CarInfoReducer.exportCar', '未执行')
        } else if (CarInfoReducer.exportCar.isExecStatus == 1) {
            console.log('CarInfoReducer.exportCar', '开始执行')
        } else if (CarInfoReducer.exportCar.isExecStatus == 2) {
            console.log('CarInfoReducer.exportCar', '执行完毕')
            if (CarInfoReducer.exportCar.isResultStatus == 0) {
                console.log('CarInfoReducer.exportCar', '执行成功')
                resetExportCar()
                removeCar(carId)

            } else if (CarInfoReducer.exportCar.isResultStatus == 1) {
                resetExportCar()
                console.log('CarInfoReducer.exportCar执行错误', CarInfoReducer.exportCar.failedMsg)

            } else if (CarInfoReducer.exportCar.isResultStatus == 2) {
                console.log('CarInfoReducer.exportCar', '执行失败')
                resetExportCar()
            }
        }




        // if (CarInfoReducer.exportCar.isExecStatus == 0) {
        //     console.log('CarInfoReducer.exportCar', '未执行')
        // } else if (CarInfoReducer.exportCar.isExecStatus == 1) {
        //     console.log('CarInfoReducer.exportCar', '开始执行')
        // } else if (CarInfoReducer.exportCar.isExecStatus == 2) {
        //     console.log('CarInfoReducer.exportCar', '执行完毕')
        //     if (CarInfoReducer.exportCar.isResultStatus == 0) {
        //         console.log('CarInfoReducer.exportCar', '执行成功')
        //         resetExportCar()
        //         removeCar(carId)

        //     } else if (CarInfoReducer.exportCar.isResultStatus == 1) {
        //         resetExportCar()
        //         console.log('CarInfoReducer.exportCar执行错误', CarInfoReducer.exportCar.failedMsg)

        //     } else if (CarInfoReducer.exportCar.isResultStatus == 2) {
        //         console.log('CarInfoReducer.exportCar', '执行失败')
        //         resetExportCar()
        //     }
        // }
        return true
    }

    appendImage(param) {
        let { userId, mobile, userType } = this.props.user
        let { carId } = this.props
        let { vin } = this.props.CarInfoReducer.getCarInfo.data
        param.requiredParam = {
            userId: userId,
            carId: carId,
            vin: vin
        }
        param.optionalParam = {
            imageType: 1
        }
        param.postFileParam.key = "image"
        param.postParam = {
            username: mobile,
            userId: userId,
            userType: userType
        }
        this.props.appendImage(param)
    }

    exportCar() {
        let { userId, mobile, userType } = this.props.user
        let { carId } = this.props
        let { r_id, p_id, storage_id } = this.props.CarInfoReducer.getCarInfo.data.car
        this.props.exportCar(
            {
                requiredParam: {
                    userId: userId,
                    relId: r_id,
                    relStatus: 2
                },
                optionalParam: {
                    parkingId: p_id,
                    storageId: storage_id,
                    carId: carId
                }
            }
        )
    }

    render() {
        let { car, recordList, imageList } = this.props.CarInfoReducer.getCarInfo.data
        return (
            <CarInfoLayout
                car={car}
                exportCar={this.exportCar}
                moveCar={this.moveCar}
                records={recordList}
                images={imageList}
                postImage={this.appendImage}
            />
        )
    }
}



const mapStateToProps = (state) => {
    return {
        user: state.LoginReducer.user,
        CarInfoReducer: state.CarInfoReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarInfo: (param) => {
        dispatch(CarInfoAction.getCarInformation(param))
    },
    exportCar: (param) => {
        dispatch(CarInfoAction.exportCar(param))
    },
    moveCar: (param, getCarInfo) => {
        dispatch(CarInfoAction.moveCar(param, getCarInfo))
    },
    appendImage: (param) => {
        dispatch(CarInfoAction.appendImage(param))
    },
    removeCar: (carId) => {
        dispatch(CarAction.removeCar(carId))
    },
    resetExportCar: () => {
        dispatch(CarInfoAction.resetExportCar())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CarInfo)