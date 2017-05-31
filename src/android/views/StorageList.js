import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as StorageListAction from '../../actions/StorageListAction'
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


    shouldComponentUpdate(nextProps, nextState) {
        let { storageListReducer } = nextProps
        /*getStorageList 执行状态*/
        if (storageListReducer.getStorageList.isExecStatus == 1) {
            console.log('storageListReducer.getStorageList开始执行')
        } else if (storageListReducer.getStorageList.isExecStatus == 2) {
            console.log('storageListReducer.getStorageList执行完毕')
            if (storageListReducer.getStorageList.isResultStatus == 0) {
                console.log('storageListReducer.getStorageList执行成功')
            } else if (storageListReducer.getStorageList.isResultStatus == 1) {
                console.log('storageListReducer.getStorageList执行错误')
            } else if (storageListReducer.getStorageList.isResultStatus == 2) {
                console.log('storageListReducer.getStorageList执行失败')
            }
        }
        /************************************************************************************************/
        return true
    }

    render() {
        let { storageList } = this.props.storageListReducer.getStorageList.data   
        return <StorageListLayout storages={storageList} />
    }
}

const mapStateToProps = (state) => {
    return {
        storageListReducer: state.StorageListReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getStorageList: (param) => {
        dispatch(StorageListAction.getStorageList(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StorageList)