import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CarAction from '../../../actions/CarAction'
import { Actions } from 'react-native-router-flux'
import CarListLayout from '../layout/CarList'

class CarList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getCarList({ requiredobj: { userid: 3 }, optionalobj: { start: 0, size: 20 } })
    }

    render() {
        return (
            <CarListLayout {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cars: state.CarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: (user) => {
        dispatch(CarAction.getCarList(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarList)