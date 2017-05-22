import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CarAction from '../../actions/CarAction'
import { Actions } from 'react-native-router-flux'
import CarListLayout from '../layout/CarList'

class CarList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCarList({
            requiredParam: {
                userid: this.props.user.userId
            },
            optionalParam: {
                start: 0,
                size: 20,
                active: 1,
                relStatus: 1
            }
        })
    }

    loadMore() {
        this.props.getCarList({
            requiredParam: {
                userid: this.props.user.userId
            },
            optionalParam: {
                start: this.props.cars.cars.length,
                size: 20,
                active: 1,
                relStatus: 1
            }
        }, false)
    }

    render() {
        console.log(this.props)
        return (
            <CarListLayout
                cars={this.props.cars.cars}
                isLoading={this.props.cars.isLoading}
                getCarList={this.props.getCarList}
                loadMore={this.loadMore.bind(this)} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cars: state.CarReducer,
        user: state.LoginReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: (param, isFirst) => {
        dispatch(CarAction.getCarList(param, isFirst))
    },
    exportCar: (param) => {
        dispatch(CarAction.getCarList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarList)