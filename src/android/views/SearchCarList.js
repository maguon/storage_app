import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as searchCarListAction from '../../actions/SearchCarListAction'
import { Actions } from 'react-native-router-flux'
import SearchCarListLayout from '../layout/SearchCarList'
import { View } from 'react-native'

class CarList extends Component {
    constructor(props) {
        super(props)
        this.searchCarList = this.searchCarList.bind(this)
        this.searchCarListMore = this.searchCarListMore.bind(this)
    }

    componentDidMount() {
        this.searchCarList()
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { searchCarListReducer } = nextProps
        // console.log(carListReducer)
        /*getCarList 执行状态*/
        if (searchCarListReducer.searchCarList.isExecStatus == 1) {
            console.log('searchCarListReducer.searchCarList开始执行')
        } else if (searchCarListReducer.searchCarList.isExecStatus == 2) {
            console.log('searchCarListReducer.searchCarList执行完毕')
            if (searchCarListReducer.searchCarList.isResultStatus == 0) {
                console.log('searchCarListReducer.searchCarList执行成功')
                this.props.resetSearchCarList()
            } else if (searchCarListReducer.searchCarList.isResultStatus == 1) {
                console.log('searchCarListReducer.searchCarList执行错误',searchCarListReducer.searchCarList.errorMsg)
                this.props.resetSearchCarList()
            } else if (searchCarListReducer.searchCarList.isResultStatus == 2) {
                console.log('searchCarListReducer.searchCarList执行失败')
                this.props.resetSearchCarList()
            }
        }


        /************************************************************************************************/

        /*getCarListMore 执行状态*/
        if (searchCarListReducer.searchCarListMore.isExecStatus == 1) {
            console.log('searchCarListReducer.searchCarListMore开始执行')
        } else if (searchCarListReducer.searchCarListMore.isExecStatus == 2) {
            console.log('searchCarListReducer.searchCarListMore执行完毕')
            if (searchCarListReducer.searchCarListMore.isResultStatus == 0) {
                console.log('searchCarListReducer.searchCarListMore执行成功没有到底')
            } else if (searchCarListReducer.searchCarListMore.isResultStatus == 1) {
                console.log('searchCarListReducer.searchCarListMore执行错误')
            } else if (searchCarListReducer.searchCarListMore.isResultStatus == 2) {
                console.log('searchCarListReducer.searchCarListMore执行失败')
            } else if (searchCarListReducer.searchCarListMore.isResultStatus == 3) {
                console.log('searchCarListReducer.searchCarListMore已经到底')
            }
        }

        /************************************************************************************************/

        return true

    }

    searchCarList() {
        let { user } = this.props
        let { vin } = this.props.searchCarListReducer.searchVin
        let param = {
            requiredParam: {
                userid: user.userId
            },
            optionalParam: {
                start: 0,
                size: 20,
                active: 1,
                relStatus: 1,
                vin: vin
            }
        }
        this.props.searchCarList(param)
    }

    searchCarListMore() {
        let { user } = this.props
        let { vin } = this.props.searchCarListReducer.searchVin
        let { carList } = this.props.searchCarListReducer.searchCarList.data
        this.props.searchCarListMore({
            requiredParam: {
                userid: user.userId
            },
            optionalParam: {
                start: carList.length,
                size: 20,
                active: 1,
                relStatus: 1,
                vin: vin
            }
        })
    }

    render() {
        let { carList } = this.props.searchCarListReducer.searchCarList.data
        let { vin } = this.props.searchCarListReducer.searchVin
        let { changeSearchVin } = this.props
        return (
            <SearchCarListLayout
                cars={carList}
                searchCarListMore={this.searchCarListMore}
                searchVin={vin}
                searchCarList={this.searchCarList}
                changeSearchVin={changeSearchVin}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        searchCarListReducer: state.SearchCarListReducer,
        user: state.LoginReducer.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    searchCarList: (param) => {
        dispatch(searchCarListAction.searchCarList(param))
    },
    searchCarListMore: (param) => {
        dispatch(searchCarListAction.searchCarListMore(param))
    },
    removeSearchCar: (param) => {
        dispatch(searchCarListAction.removeSearchCar(param))
    },
    resetSearchCarList: () => {
        dispatch(searchCarListAction.resetSearchCarList())
    },
    changeSearchVin: (param) => {
        dispatch(searchCarListAction.changeSearchVin(param))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarList)