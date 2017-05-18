import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutHome from '../layout/Home'
import Camera from '../components/Camera'
import * as StorageDateAction from '../../actions/StorageDateAction'
import * as RecordAction from '../../actions/RecordAction'
import Loading from '../components/Loading/Loading'



class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let now = new Date()
        year = now.getFullYear()
        month = now.getMonth() + 1
        month = month >= 10 ? month : `0${month}`
        day = now.getDate()
        day = day >= 10 ? day : `0${day}`
        now = `${year}${month}${day}`

        this.props.getStorageList({
            optionalParam: {
                dateStart: now,
                dateEnd: now
            }
        })

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
            <LayoutHome {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        storages: state.StorageDateReducer,
        records: state.RecordReducer,
        user: state.UserReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageList: (param) => {
        dispatch(StorageDateAction.getStorageList(param))
    },
    getRecordList: (param) => {
        dispatch(RecordAction.getRecordList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

