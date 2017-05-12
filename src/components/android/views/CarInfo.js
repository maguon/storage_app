/**
 * Created by rbyu on 2017/5/11.
 */
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import * as CarAction from '../../../actions/CarAction'
import CarInfoLayout from '../layout/CarInfo'


class CarInfo extends Component {
    constructor(props) {
        super(props)

        this.exportCar = this.exportCar.bind(this)
        this.moveCar = this.moveCar.bind(this)
    }

    moveCar() {

    }
    exportCar() {
        this.props.exportCar(
            {
                requiredParam: {
                    userId: 3,
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
        return (
            <CarInfoLayout car={this.props.car} exportCar={this.exportCar} moveCar={this.moveCar} />
        )
    }

}



const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => ({
    exportCar: (param) => {
        dispatch(CarAction.exportCar(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarInfo)