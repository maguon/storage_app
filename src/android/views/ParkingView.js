import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import LayoutParkingView from '../layout/ParkingView'
import * as ParkingViewAction from '../../actions/ParkingViewAction'


class ParkingView extends Component {
    constructor(props) {
        super(props)
        this.getParkingList = this.getParkingList.bind(this)
    }

    componentDidMount() {
        this.getParkingList()
    }

    getParkingList() {
        let param = {
            optionalParam: {
                storageId: this.props.storage_id
            }
        }
        this.props.getParkingList(param)
    }

    render() {
        let { parkingList } = this.props.parkingViewReducer.getParkingList.data
        return <LayoutParkingView
            parkingList={parkingList}
            row={this.props.row}
            col={this.props.col} />

    }
}


const mapStateToProps = (state) => {
    return {
        parkingViewReducer: state.ParkingViewReducer,
        user: state.LoginReducer.user

    }
}

const mapDispatchToProps = (dispatch) => ({
    getParkingList: (param) => {
        dispatch(ParkingViewAction.getParkingList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParkingView)