import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CarAction from '../../actions/CarAction'
import { Actions } from 'react-native-router-flux'
import SearchCarListLayout from '../layout/SearchCarList'

class CarList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCarList({
            requiredParam: {
                userid: 3
            },
            optionalParam: {
                start: 0,
                size: 20,
                active: 1,
                relStatus: 1,
                vin: this.props.vin
            }
        })
    }

    loadMore() {
        this.props.getCarList({
            requiredParam: {
                userid: 3
            },
            optionalParam: {
                start: this.props.cars.length,
                size: 20,
                active: 1,
                relStatus: 1,
                vin: this.props.vin
            }
        }, false)
    }

    render() {
        return (
            <SearchCarListLayout {...this.props} loadMore={this.loadMore.bind(this)} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.CarReducer
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