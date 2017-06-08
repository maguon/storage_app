import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import ParkingViewComponent from '../components/ParkingView/ParkingView'
import NavBar from '../components/Bar/NavBar'

export default class ParkingView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let { parkingList } = this.props
        //console.log(parkingList)
        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <NavBar title='选择道位' />
                <ParkingViewComponent
                    parkingList={parkingList}
                    row={this.props.row}
                    col={this.props.col} />
            </View>
        )
    }
}