import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as StorageDateAction from '../../actions/StorageDateAction'
import StorageListLayout from '../layout/StorageList'

class StorageList extends Component {
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
    }

    render() {
        return <StorageListLayout {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.StorageDateReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageList: (param) => {
        dispatch(StorageDateAction.getStorageList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StorageList)