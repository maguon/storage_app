import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        recordList: []
    },
    getRecordListForCar: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.carOpRecord.get_recordListForCar_success]: (state, action) => {
        const { payload: { recordList } } = action
        return {
            data: {
                recordList
            },
            getRecordListForCar: {
                ...state.getRecordListForCar,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.carOpRecord.get_recordListForCar_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getRecordListForCar: {
                ...state.getRecordListForCar,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.carOpRecord.get_recordListForCar_waiting]: (state, action) => {
        return {
            ...state,
            getRecordListForCar: {
                ...state.getRecordListForCar,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.carOpRecord.get_recordListForCar_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getRecordListForCar: {
                ...state.getRecordListForCar,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)