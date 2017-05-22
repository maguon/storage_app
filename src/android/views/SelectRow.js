import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'
import * as StorageParkingAction from '../../actions/StorageParkingAction'

class SelectRow extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getStorageParkingList({
            optionalParam: {
                storageId: this.props.storageId
            }
        })
    }

    render() {
        console.log(this.props.storageParkings.storageParkings)
        let storageParkings = this.props.storageParkings.storageParkings.reduce((acc, val) => {
            if (val.car_id == 0) {
                let row = acc.find(item => { return item.row == val.row })
                if (!row) {
                    row = {}
                    row.row = val.row
                    row.columns = []
                    acc.push(row)
                }
                row.columns.push({ col: val.col, parkingId: val.id })
            }
            return acc
        }, []).sort((a, b) => {
            return a.row - b.row
        })


        console.log(storageParkings)

        storageParkings = storageParkings.map(item => {
            return (
                <TouchableHighlight key={item.row} underlayColor='rgba(0,0,0,0.1)' onPress={() => Actions.SelectColumn({ columns: item.columns, row: item.row, storageId: this.props.storageId, storageName: this.props.storageName,_popNum:this.props._popNum })} >
                    <Text>{item.row.toString()}</Text>
                </TouchableHighlight>)
        })

        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择排'} />
                <ScrollView>
                    {storageParkings}
                </ScrollView>
            </View>
        )
    }

}


const mapStateToProps = (state) => {
    return {
        storageParkings: state.StorageParkingReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageParkingList: (param) => {
        dispatch(StorageParkingAction.getStorageParkingList(param))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectRow)