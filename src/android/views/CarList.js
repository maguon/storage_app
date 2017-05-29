import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as CarListAction from '../../actions/CarListAction'
import { Actions } from 'react-native-router-flux'
import CarListLayout from '../layout/CarList'

class CarList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let { userId } = this.props.user
        this.props.getCarList({
            requiredParam: {
                userid: userId
            },
            optionalParam: {
                start: 0,
                size: 5,
                active: 1,
                relStatus: 1
            }
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        let { carListReducer } = nextProps
        /*getCarList 执行状态*/
        if (carListReducer.getCarList.isExecStatus == 1) {
            console.log('carListReducer.getCarList开始执行')
        } else if (carListReducer.getCarList.isExecStatus == 2) {
            console.log('carListReducer.getCarList执行完毕')
            if (carListReducer.getCarList.isResultStatus == 0) {
                console.log('carListReducer.getCarList执行成功')
                this.props.resetGetCarList()
            } else if (carListReducer.getCarList.isResultStatus == 1) {
                console.log('carListReducer.getCarList执行错误')
                this.props.resetGetCarList()
            } else if (carListReducer.getCarList.isResultStatus == 2) {
                console.log('carListReducer.getCarList执行失败')
                this.props.resetGetCarList()
            }
        }

        /************************************************************************************************/


        /*getCarListMore 执行状态*/
        if (carListReducer.getCarListMore.isExecStatus == 1) {
            console.log('carListReducer.getCarListMore开始执行')
        } else if (carListReducer.getCarListMore.isExecStatus == 2) {
            console.log('carListReducer.getCarListMore执行完毕')
            if (carListReducer.getCarListMore.isResultStatus == 0) {
                console.log('carListReducer.getCarListMore执行成功没有到底', carListReducer.getCarList.data)
            } else if (carListReducer.getCarListMore.isResultStatus == 1) {
                console.log('carListReducer.getCarListMore执行错误')
            } else if (carListReducer.getCarListMore.isResultStatus == 2) {
                console.log('carListReducer.getCarListMore执行失败')
            } else if (carListReducer.getCarListMore.isResultStatus == 3) {
                console.log('carListReducer.getCarListMore已经到底')
            }
        }

        /************************************************************************************************/


        return true
    }

    getCarListMore() {
        let { userId } = this.props.user
        let { carList } = this.props.carListReducer.getCarList.data
        this.props.getCarListMore({
            requiredParam: {
                userid: userId
            },
            optionalParam: {
                start: carList.length,
                size: 5,
                active: 1,
                relStatus: 1
            }
        })
    }

    render() {
        let { carList } = this.props.carListReducer.getCarList.data
        return (
            <CarListLayout
                cars={carList}
                getCarList={this.props.getCarList}
                getCarListMore={this.getCarListMore.bind(this)} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carListReducer: state.CarListReducer,
        user: state.LoginReducer.user
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCarList: (param) => {
        dispatch(CarListAction.getCarList(param))
    },
    getCarListMore: (param) => {
        dispatch(CarListAction.getCarListMore(param))
    },
    resetGetCarList: () => {
        dispatch(CarListAction.resetGetCarList())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CarList)