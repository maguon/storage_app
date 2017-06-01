import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    searchCarList: {
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
    searchCarListMore: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

export default handleActions({
    [actionTypes.searchCarListTypes.SEARCH_CARLIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action

        return {
            ...state,
            searchCarList: {
                ...state.searchCarList,
                isResultStatus: 0,
                isExecStatus: 2,
                data: {
                    carList: data
                }
            }
        }
    },
    [actionTypes.searchCarListTypes.SEARCH_CARLIST_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            searchCarList: {
                ...state.searchCarList,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data

            }
        }
    },
    [actionTypes.searchCarListTypes.SEARCH_CARLIST_WAITING]: (state, action) => {
        return {
            ...state,
            searchCarList: {
                ...state.searchCarList,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.searchCarListTypes.SEARCH_CARLIST_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            searchCarList: {
                ...state.searchCarList,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.searchCarListTypes.RESET_SEARCH_CARLIST]: (state, action) => {
        return {
            ...state,
            searchCarList: {
                ...state.searchCarList,
                isExecStatus: 0
            }
        }
    },
    [actionTypes.searchCarListTypes.SEARCH_CARLIST_MORE_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        if (data.length == 0) {
            return {
                ...state,
                searchCarListMore: {
                    ...state.searchCarListMore,
                    isResultStatus: 3,
                    isExecStatus: 2
                }
            }
        }
        else {
            return {
                getCarList: {
                    ...state.searchCarList,
                    data: {
                        carList: [...state.searchCarList.data.carList, ...data]
                    }
                },
                searchCarListMore: {
                    ...state.searchCarListMore,
                    isResultStatus: 0,
                    isExecStatus: 2
                }
            }
        }
    },
    [actionTypes.searchCarListTypes.SEARCH_CARLIST_MORE_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            searchCarListMore: {
                ...state.searchCarListMore,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.searchCarListTypes.SEARCH_CARLIST_MORE_WAITING]: (state, action) => {
        return {
            ...state,
            searchCarListMore: {
                ...state.searchCarListMore,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.searchCarListTypes.SEARCH_CARLIST_MORE_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            searchCarListMore: {
                ...state.searchCarListMore,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    },
    [actionTypes.searchCarListTypes.REMOVE_SEARCH_CAR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            searchCarList: {
                ...state.searchCarList,
                data: {
                    carList: state.searchCarList.data.carList.filter(item => { return item.id != data })
                }
            }
        }
    }
}, initialState)