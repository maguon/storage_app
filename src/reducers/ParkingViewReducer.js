import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    getParkingList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            parkingList: []
        }
    }
}

export default handleActions({
    [actionTypes.parkingViewTypes.GET_PARKINGLIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            getParkingList: {
                ...state.getParkingList,
                isResultStatus: 0,
                isExecStatus: 2,
                data: {
                    parkingList: data
                }
            }
        }
    },
    [actionTypes.parkingViewTypes.GET_PARKINGLIST_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            getParkingList: {
                ...state.getParkingList,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.parkingViewTypes.GET_PARKINGLIST_WAITING]: (state, action) => {
        return {
            getParkingList: {
                ...state.getParkingList,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.parkingViewTypes.GET_PARKINGLIST_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            getParkingList: {
                ...state.getParkingList,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    }
}, initialState)