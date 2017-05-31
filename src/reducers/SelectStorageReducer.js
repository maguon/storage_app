/**
 * Created by lingxue on 2017/4/17.
 */
import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'


//isResultStatus(执行结果状态):[0(成功)，1(错误)，2(执行失败)] 
//isExecuteStatus(执行状态):[0(未执行)，1(正在执行)，2(执行完毕)]
const initialState = {
    getSelectStorageList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            selectStorageList: []
        }
    }
}

export default handleActions({
    [actionTypes.selectStorageTypes.GET_SELECTSTORAGELIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            getSelectStorageList: {
                ...state.getSelectStorageList,
                isExecStatus: 2,
                isResultStatus: 0,
                data: {
                    selectStorageList: data
                }
            }
        }
    },
    [actionTypes.selectStorageTypes.GET_SELECTSTORAGELIST_WAITING]: (state, action) => {
        return {
            getSelectStorageList: {
                ...state.getSelectStorageList,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.selectStorageTypes.GET_SELECTSTORAGELIST_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            getSelectStorageList: {
                ...state.getSelectStorageList,
                isExecStatus: 2,
                isResultStatus: 1,
                errorMsg: data
            }
        }
    },
    [actionTypes.selectStorageTypes.GET_SELECTSTORAGELIST_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            getSelectStorageList: {
                ...state.getSelectStorageList,
                isExecStatus: 2,
                isResultStatus: 2,
                failedMsg: data
            }
        }
    }
}, initialState)