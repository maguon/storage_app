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
        let { carId } = this.props
        let { userId } = this.props.user


        this.props.getCarInfo({
            requiredParam: {
                carId: carId,
                userId: userId
            },
            optionalParam: {
                active: 1,
                relStatus: 1,
                carId: carId
            }
        })
    }

    componentWillReceiveProps(nextProps) {

    }

    moveCar() {
        let { storage_id, storage_name } = this.props.CarInfoReducer.getCarInfo.data.car
        let { userId } = this.props.user
        let { carId } = this.props
        let { moveCar } = this.props
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
            })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { CarInfoReducer } = nextProps
        let { removeCar, resetExportCar, resetMoveCar, resetAppendCarImage, resetGetCarInfo } = nextProps
        let { carId } = this.props
        /*getCarInfo 执行状态*/
        if (CarInfoReducer.getCarInfo.isExecStatus == 0) {
            console.log('CarInfoReducer.getCarInfo', '未执行')
        } else if (CarInfoReducer.getCarInfo.isExecStatus == 1) {
            console.log('CarInfoReducer.getCarInfo', '开始执行')
        } else if (CarInfoReducer.getCarInfo.isExecStatus == 2) {
            console.log('CarInfoReducer.getCarInfo', '执行完毕')
            if (CarInfoReducer.getCarInfo.isResultStatus == 0) {
                console.log('CarInfoReducer.getCarInfo', '执行成功')
                resetGetCarInfo()
            } else if (CarInfoReducer.getCarInfo.isResultStatus == 1) {
                console.log('CarInfoReducer.getCarInfo', '执行错误')
                resetGetCarInfo()
            } else if (CarInfoReducer.getCarInfo.isResultStatus == 2) {
                console.log('CarInfoReducer.getCarInfo', '执行失败')
                resetGetCarInfo()
            }
        }
        /************************************************************************************************/

        /*exportCar 执行状态*/
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
        /************************************************************************************************/

        /*appendCarImage执行状态*/
        if (CarInfoReducer.appendCarImage.isExecStatus == 0) {
            console.log('CarInfoReducer.appendCarImage', '未执行')
        } else if (CarInfoReducer.appendCarImage.isExecStatus == 1) {
            console.log('CarInfoReducer.appendCarImage', '开始执行')
        } else if (CarInfoReducer.appendCarImage.isExecStatus == 2) {
            console.log('CarInfoReducer.appendCarImage', '执行完毕')
            if (CarInfoReducer.appendCarImage.isResultStatus == 0) {
                console.log('CarInfoReducer.appendCarImage', '执行成功')
                resetAppendCarImage()
            } else if (CarInfoReducer.appendCarImage.isResultStatus == 1) {
                console.log('CarInfoReducer.appendCarImage', '执行错误')
                resetAppendCarImage()
            } else if (CarInfoReducer.appendCarImage.isResultStatus == 2) {
                console.log('CarInfoReducer.appendCarImage', '执行失败')
                resetAppendCarImage()
            }
        }
        /************************************************************************************************/

        /*moveCar执行状态*/
        if (CarInfoReducer.moveCar.isExecStatus == 0) {
            console.log('CarInfoReducer.moveCar', '未执行')
        } else if (CarInfoReducer.moveCar.isExecStatus == 1) {
            console.log('CarInfoReducer.moveCar', '开始执行')
        } else if (CarInfoReducer.moveCar.isExecStatus == 2) {
            console.log('CarInfoReducer.moveCar', '执行完毕')
            if (CarInfoReducer.moveCar.isResultStatus == 0) {
                console.log('CarInfoReducer.moveCar', '执行成功')
                resetMoveCar()
                this.getCarInfo()
            } else if (CarInfoReducer.moveCar.isResultStatus == 1) {
                console.log('CarInfoReducer.moveCar', '执行错误')
                resetMoveCar()
            } else if (CarInfoReducer.moveCar.isResultStatus == 2) {
                console.log('CarInfoReducer.moveCar', '执行失败')
                resetMoveCar()
            }
        }
        /************************************************************************************************/
        return true
    }

    appendImage(param) {
        let { userId, mobile, userType } = this.props.user
        let { carId } = this.props
        let { vin } = this.props.CarInfoReducer.getCarInfo.data.car
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
        CarInfoReducer: state.CarInfoReducer,
        carId: 335
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarInfo: (param) => {
        dispatch(CarInfoAction.getCarInformation(param))
    },
    exportCar: (param) => {
        dispatch(CarInfoAction.exportCar(param))
    },
    moveCar: (param) => {
        dispatch(CarInfoAction.moveCar(param))
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
    resetAppendCarImage: () => {
        dispatch(CarInfoAction.resetAppendCarImage())
    },
    resetGetCarInfo: () => {
        dispatch(CarInfoAction.resetGetCarInfo())
    },
    resetMoveCar: () => {
        dispatch(CarInfoAction.resetMoveCar())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CarInfo)