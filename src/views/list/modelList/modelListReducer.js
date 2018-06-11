import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        modelList: []
    },
    getModelList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.modelList.get_modelList_success]: (state, action) => {
        const { payload: { modelList } } = action
        return {
            data: {
                modelList
            },
            getModelList: {
                ...state.getModelList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.modelList.get_modelList_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getModelList: {
                ...state.getModelList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.modelList.get_modelList_waiting]: (state, action) => {
        return {
            ...state,
            getModelList: {
                ...state.getModelList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.modelList.get_modelList_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getModelList: {
                ...state.getModelList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)