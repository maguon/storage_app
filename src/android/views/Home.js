import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutHome from '../layout/Home'
import * as HomeAction from '../../actions/HomeAction'
import * as searchCarListAction from '../../actions/SearchCarListAction'
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

        let { getRecordsForHome, getStoragesForHome } = this.props
        let { userId } = this.props.userReducer
        getRecordsForHome({ OptionalParam: { start: 0, size: 10, userId: userId } })
        getStoragesForHome({ OptionalParam: { dateStart: now, dateEnd: now } })

    }

    shouldComponentUpdate(nextProps, nextState) {
        let { homeReducer } = nextProps
        let { resetStoragesForHome, resetRecordsForHome } = this.props
        /** homeReducer.getStoragesHome */
        if (homeReducer.getStoragesHome.isExecStatus == 1) {
            console.log('homeReducer.getStoragesHome', '开始执行')
        } else if (homeReducer.getStoragesHome.isExecStatus == 2) {
            if (homeReducer.getStoragesHome.isResultStatus == 0) {
                console.log('homeReducer.getStoragesHome执行成功', homeReducer.getStoragesHome.data)
                resetStoragesForHome()
            } else if (homeReducer.getStoragesHome.isResultStatus == 1) {
                console.log('homeReducer.getStoragesHome执行错误', homeReducer.getStoragesHome.errorMsg)
                resetStoragesForHome()
            }
            else if (homeReducer.getStoragesHome.isResultStatus == 2) {
                console.log('homeReducer.getStoragesHome执行失败', homeReducer.getStoragesHome.failedMsg)
                resetStoragesForHome()
            }
        }
        /*********************************************************************** */



        /** homeReducer.getStoragesHome */
        if (homeReducer.getRecordsHome.isExecStatus == 1) {
            console.log('homeReducer.getRecordsHome', '开始执行')
        } else if (homeReducer.getRecordsHome.isExecStatus == 2) {
            if (homeReducer.getRecordsHome.isResultStatus == 0) {
                console.log('homeReducer.getRecordsHome执行成功', homeReducer.getRecordsHome.data)
                resetRecordsForHome()
            } else if (homeReducer.getRecordsHome.isResultStatus == 1) {
                console.log('homeReducer.getRecordsHome执行错误', homeReducer.getRecordsHome.errorMsg)
                resetRecordsForHome()
            }
            else if (homeReducer.getRecordsHome.isResultStatus == 2) {
                console.log('homeReducer.getRecordsHome执行失败', homeReducer.getRecordsHome.failedMsg)
                resetRecordsForHome()
            }
        }
        /*********************************************************************** */
        return true
    }

    render() {
        let { storageList } = this.props.homeReducer.getStoragesHome.data
        let { recordList } = this.props.homeReducer.getRecordsHome.data
        return (
            <LayoutHome
                storages={storageList}
                recordList={recordList}
                changeSearchVin={this.props.changeSearchVin}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userReducer: state.LoginReducer.user,
        homeReducer: state.HomeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRecordsForHome: (param) => {
        dispatch(HomeAction.getRecordsForHome(param))
    },
    getStoragesForHome: (param) => {
        dispatch(HomeAction.getStoragesForHome(param))
    },
    resetStoragesForHome: () => {
        dispatch(HomeAction.resetStoragesForHome())
    },
    resetRecordsForHome: () => {
        dispatch(HomeAction.resetRecordsForHome())
    },
    changeSearchVin: (param) => {
        dispatch(searchCarListAction.changeSearchVin(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

