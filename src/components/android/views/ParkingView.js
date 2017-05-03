import React, { Component } from 'react'
import { Text, View,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import * as StorageAction from '../../../actions/StorageAction'

 export default class ParkingView extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        
        this.props.getParkingById(this.props.storage.id)        
    }
    render() {

        let parkings =this.props.storage.parkings.map(item=>

                <Text>{item.row}-{item.col}</Text>
        )
        console.log('ParkingViewstorage',this.props.storage)
         console.log('parkings',parkings)
        return (
            <ScrollView>
                {parkings}
                <Text>{this.props.storage.id}</Text>
            </ScrollView>
        )
    }

}
// const mapStateToProps = (state) => {
//     console.log('mapStateToProps',state)
//     return {
//         storages:state.StorageReducer
//     }
// }

// const mapDispatchToProps = (dispatch) => ({
//     getParkingById: (id) => {
//         dispatch(StorageAction.getParkingById(id))
//     }
// })

//  connect()(ParkingView)