/**
 * Created by rbyu on 2017/5/11.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutHome from '../layout/Home'
import Camera from '../components/Camera'
import * as StorageAction from '../../../actions/StorageAction'
import * as RecordAction from '../../../actions/RecordAction'
import Loading from '../components/Loading'



class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getStorageList()
        this.props.getRecordList({
            optionalParam: {
                start: 0,
                size: 10,
                userId: 3
            }
        })
    }

    render() {
        return (
              //<LayoutHome {...this.props} />
              <Loading />
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
    getRecordList: (param) => {
        dispatch(RecordAction.getRecordList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

