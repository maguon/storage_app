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
                size: 20,
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
                console.log('carListReducer.getCarList执行成功', carListReducer.getCarList.data)

            } else if (carListReducer.getCarList.isResultStatus == 1) {
                console.log('carListReducer.getCarList执行错误')
            } else if (carListReducer.getCarList.isResultStatus == 2) {
                console.log('carListReducer.getCarList执行失败')
            }
        }

        /************************************************************************************************/

        return true
    }

    loadMore() {
        let { userId } = this.props.user
        let { carList } = this.props.carListReducer.getCarList.data
        this.props.getCarList({
            requiredParam: {
                userid: userId
            },
            optionalParam: {
                start: carList.length,
                size: 20,
                active: 1,
                relStatus: 1
            }
        })
    }

    render() {
        // console.log(this.props)
        let { carList } = this.props.carListReducer.getCarList.data
        return (
            <CarListLayout
                cars={carList}
                getCarList={this.props.getCarList}
                loadMore={this.loadMore.bind(this)} />
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
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(CarList)