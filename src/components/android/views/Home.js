/**
 * Created by rbyu on 2017/5/11.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutHome from '../layout/Home'
import * as StorageAction from '../../../actions/StorageAction'
import * as RecordAction from '../../../actions/RecordAction'


class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getStorageList()
        this.props.getRecordsAllByUser({ id: 3 })
    }

    render() {
        return (
            <LayoutHome {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        storages: state.StorageReducer,
        records: state.RecordReducer,
        user: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageList: () => {
        dispatch(StorageAction.getStorageList())
    },
    getRecordsAllByUser: (user) => {
        dispatch(RecordAction.getRecordsAllByUser(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

