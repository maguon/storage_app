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
        let { parkingList, row, col } = this.props

        return (
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
                <NavBar title={`${this.props.storage_name}(${parkingList.length-this.props.balance}/${parkingList.length})`}/>
                    <ParkingViewComponent
                        parkingList={parkingList}
                        row={row}
                        col={col} />
            </View>
        )
    }
}