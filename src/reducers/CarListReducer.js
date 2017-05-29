import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    getCarList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            carList: []
        }
    },
    //isResultStatus(执行结果状态):[0(成功且没有到底)，1(错误)，2(执行失败)，3（成功且已经加载全部数据）] 
    //isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
    getCarListMore: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.carListTypes.GET_CARLIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action

        return {
            ...state,
            getCarList: {
                ...state.getCarList,
                isResultStatus: 0,
                isExecStatus: 2,
                data: {
                    carList: data
                }
            }
        }
    },
    [actionTypes.carListTypes.GET_CARLIST_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarList: {
                ...state.getCarList,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data

            }
        }
    },
    [actionTypes.carListTypes.GET_CARLIST_WAITING]: (state, action) => {
        return {
            ...state,
            getCarList: {
                ...state.getCarList,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carListTypes.GET_CARLIST_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarList: {
                ...state.getCarList,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.carListTypes.RESET_GET_CARLIST]: (state, action) => {
        return {
            ...state,
            getCarList: {
                ...state.getCarList,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.carListTypes.GET_CARLIST_MORE_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        if (data.length == 0) {
            return {
                ...state,
                getCarListMore: {
                    ...state.getCarListMore,
                    isResultStatus: 3,
                    isExecStatus: 2
                }
            }
        }
        else {
            return {
                getCarList: {
                    ...state.getCarList,
                    data: {
                        carList: [...state.getCarList.data.carList, ...data]
                    }
                },
                getCarListMore: {
                    ...state.getCarListMore,
                    isResultStatus: 0,
                    isExecStatus: 2
                }
            }
        }
    },
    [actionTypes.carListTypes.GET_CARLIST_MORE_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarListMore: {
                ...state.getCarListMore,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.carListTypes.GET_CARLIST_MORE_WAITING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarListMore: {
                ...state.getCarListMore,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.carListTypes.GET_CARLIST_MORE_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarListMore: {
                ...state.getCarListMore,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.carListTypes.REMOVE_CAR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getCarList: {
                ...state.getCarList,
                data: {
                    carList: state.getCarList.data.carList.filter(item => { return item.id != data })
                }
            }
        }
    }
}, initialState)