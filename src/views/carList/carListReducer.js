import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        carList: []
    },
    queryCar: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.carList.query_car_success]: (state, action) => {
        const { payload: { carList } } = action
        return {
            data: {
                carList
            },
            queryCar: {
                ...state.queryCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carList.query_car_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            queryCar: {
                ...state.queryCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carList.query_car_waiting]: (state, action) => {
        return {
            ...state,
            queryCar: {
                ...state.queryCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carList.query_car_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            queryCar: {
                ...state.queryCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    },



    [actionTypes.carList.set_carInfoForCarList]: (state, action) => {
        const { payload: { carInfo } } = action
        return {
            ...state,
            data: {
                carList: state.data.carList.map(item => {
                    if (item.id == carInfo.id) {
                        return { ...item, ...carInfo }
                    } else {
                        return item
                    }
                })
            }
        }
    }
}, initialState)