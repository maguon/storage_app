import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    getRecordList: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            recordList: []
        }
    },
    selectRecordListTab: {
        selectedTab: 'all' //all ,import,export,movc
    }
}

export default handleActions({
    [actionTypes.recordListTypes.CHANGE_RECORD_LIST_TAB]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            selectRecordListTab: {
                selectedTab: data
            }
        }
    },
    [actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_FAILED]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRecordList: {
                ...state.getRecordList,
                isResultStatus: 2,
                isExecStatus: 2,
                failedMsg: data
            }
        }
    },
    [actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRecordList: {
                ...state.getRecordList,
                isResultStatus: 0,
                isExecStatus: 2,
                data: {
                    recordList: data
                }
            }
        }
    },
    [actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_WAITING]: (state, action) => {
        return {
            ...state,
            getRecordList: {
                ...state.getRecordList,
                isExecStatus: 1
            }
        }
    },
    [actionTypes.recordListTypes.GET_RECORD_LIST_VIEW_ERROR]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            getRecordList: {
                ...state.getRecordList,
                isResultStatus: 1,
                isExecStatus: 2,
                errorMsg: data
            }
        }
    }
}, initialState)