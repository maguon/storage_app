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
        this.props.getCarAll({ id: 3 })
    }

    render() {
        return (
            <CarListLayout {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cars: state.CarReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarAll: (user) => {
        dispatch(CarAction.getCarAll(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarList)