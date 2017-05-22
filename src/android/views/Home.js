import React, { Component } from 'react'
import { connect } from 'react-redux'
import LayoutHome from '../layout/Home'
import Camera from '../components/Camera'
import * as StorageDateAction from '../../actions/StorageDateAction'
import * as HomeAction from '../../actions/HomeAction'
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

        this.props.getHomeData({
            getStorageListParam: {
                OptionalParam: {
                    dateStart: now,
                    dateEnd: now
                }
            },
            getRecordListParam: {
                OptionalParam: {
                    start: 0,
                    size: 10,
                    userId: this.props.user.userId
                }
            }
        })
    }

    render() {
        console.log('home', this.props.home)
        console.log('user', this.props.user)
        return (
            <LayoutHome
                storages={this.props.home.storageList}
                records={this.props.home.recordList}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.LoginReducer.user,
        home: state.HomeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getHomeData: (param) => {
        dispatch(HomeAction.getHomeData(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)

