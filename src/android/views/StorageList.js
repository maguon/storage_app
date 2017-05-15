import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as StorageAction from '../../actions/StorageAction'
import StorageListLayout from '../layout/StorageList'

class StorageList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getStorageList()
    }

    render() {
        return <StorageListLayout {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
       ...state.StorageReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageList: () => {
        dispatch(StorageAction.getStorageList())
    }
    // getParkingById: (id) => {
    //     dispatch(StorageAction.getParkingById(id))
    // }
})

export default connect(mapStateToProps, mapDispatchToProps)(StorageList)