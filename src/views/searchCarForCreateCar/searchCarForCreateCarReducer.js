import { handleActions } from 'redux-actions'
import * as actionTypes from '../../actionTypes'

const initialState = {
    data: {
        carList: []
    },
    getCarList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.searchCarForCreateCar.get_carListForCreateCar_success]: (state, action) => {
        const { payload: { carList } } = action
        return {
            data: {
                carList
            },
            getCarList: {
                ...state.getCarList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.searchCarForCreateCar.get_carListForCreateCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getCarList: {
                ...state.getCarList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.searchCarForCreateCar.get_carListForCreateCar_waiting]: (state, action) => {
        return {
            ...state,
            getCarList: {
                ...state.getCarList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.searchCarForCreateCar.get_carListForCreateCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getCarList: {
                ...state.getCarList,
                isResultStatus: 3,
                errorMsg
            }
        }
    },

    [actionTypes.searchCarForCreateCar.clean_carListForCreateCar]: (state, action) => {
        return {
            ...initialState
        }
    }

}, initialState)