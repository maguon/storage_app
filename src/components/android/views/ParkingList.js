import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as StorageAction from '../../../actions/StorageAction'
import Parking from '../components/Parking'
import { Actions } from 'react-native-router-flux'
import SearchBar from '../components/Bar/SearchBar'

class ParkingList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getStorageList()
    }

    render() {
        let storages = this.props.storages.map(item =>
            <Parking getParkingById={this.props.getParkingById}
                storage={item}
                key={item.id}
                nextPage={Actions.ParkingView} />)

        let viewStyle = { backgroundColor: '#00cade' }
        return (
            <View style={{ flex: 1 }}>
                <SearchBar viewStyle={viewStyle} />
                <ScrollView >
                    {storages}
                </ScrollView>

            </View>
        )
    }
}

const mapStateToProps = (state) => {

    return {
        storages: state.StorageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageList: () => {
        dispatch(StorageAction.getStorageList())
    },
    getParkingById: (id) => {
        dispatch(StorageAction.getParkingById(id))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ParkingList)