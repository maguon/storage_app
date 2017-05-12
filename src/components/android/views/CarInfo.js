/**
 * Created by rbyu on 2017/5/11.
 */
import React, { Component } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import * as RecordAction from '../../../actions/RecordAction'
import CarInfoLayout from '../layout/CarInfo'


class CarInfo extends Component {
    constructor(props) {
        super(props)

        this.exportCar = this.exportCar.bind(this)
        this.moveCar = this.moveCar.bind(this)
        this.getRecordLisMore = this.getRecordLisMore.bind(this)
    }

    componentDidMount() {
        this.props.getRecordList({
            optionalParam: {
                start: 0,
                size: 10,
                userId: 3,
                carId: this.props.car.id
            }
        })
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

    getRecordLisMore() {
        this.props.getRecordList({
            optionalParam: {
                start: this.props.records.length,
                size: 10,
                userId: 3,
                carId: this.props.car.id
            }
        }, false)
    }



    render() {
        return (
            <CarInfoLayout
                car={this.props.car}
                exportCar={this.exportCar}
                moveCar={this.moveCar}
                records={this.props.records}
                getRecordLisMore={this.getRecordLisMore}
            />
        )
    }
}



const mapStateToProps = (state) => {
    return {
        records: state.RecordReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    exportCar: (param) => {
        dispatch(CarAction.exportCar(param))
    },
    getRecordList: (param, isFirst) => {
        dispatch(RecordAction.getRecordList(param, isFirst))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarInfo)