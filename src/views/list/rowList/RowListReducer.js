import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        parkingList: []
    },
    getParkingList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.rowList.get_parkingListForSelect_success]: (state, action) => {
        const { payload: { parkingList } } = action
        return {
            data: {
                parkingList
            },
            getParkingList: {
                ...state.getParkingList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.rowList.get_parkingListForSelect_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getParkingList: {
                ...state.getParkingList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.rowList.get_parkingListForSelect_waiting]: (state, action) => {
        return {
            ...state,
            getParkingList: {
                ...state.getParkingList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.rowList.get_parkingListForSelects_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getParkingList: {
                ...state.getParkingList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)