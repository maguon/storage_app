import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as searchCarListAction from '../../actions/SearchCarListAction'
import { Actions } from 'react-native-router-flux'
import SearchCarListLayout from '../layout/SearchCarList'
import { View } from 'react-native'

class CarList extends Component {
    constructor(props) {
        super(props)
        this.searchCarList = this.searchCarList.bind(this)
        this.searchCarListMore = this.searchCarListMore.bind(this)
    }

    componentDidMount() {

    }

    searchCarList() {
        this.props.searchCarList({
            requiredParam: {
                userid: this.props.user.userId
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


    searchCarListMore() {
        this.props.searchCarListMore({
            requiredParam: {
                userid: this.props.user.userId
            },
            optionalParam: {
                start: this.props.cars.length,
                size: 20,
                active: 1,
                relStatus: 1,
                vin: this.props.vin
            }
        })
    }

    render() {
        let { carList } = this.props.searchCarListReducer.searchCarList.data

        console.log(this.props)
        return (
            <SearchCarListLayout
                cars={carList}
                searchCarListMore={this.searchCarListMore}
            />

        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchCarListReducer: state.SearchCarListReducer,
        user: state.LoginReducer.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    searchCarList: (param) => {
        dispatch(searchCarListAction.searchCarList(param))
    },
    searchCarListMore: (param) => {
        dispatch(searchCarListAction.searchCarListMore(param))
    },
    removeSearchCar: (param) => {
        dispatch(searchCarListAction.removeSearchCar(param))
    },
    resetSearchCarList: () => {
        dispatch(searchCarListAction.resetSearchCarList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarList)