import { handleActions } from 'redux-actions'
import * as actionTypes from '../../../actionTypes'

const initialState = {
    data: {
        areaList: []
    },
    getAreaList: {
        isResultStatus: 0,
        errorMsg: '',
        failedMsg: ''
    }
}

//isResultStatus(执行结果状态):[0(未执行),1(等待)，2(成功)，3(错误)，4(执行失败)]
export default handleActions({
    [actionTypes.areaList.get_areaListForSelect_success]: (state, action) => {
        const { payload: { areaList } } = action
        return {
            data: {
                areaList
            },
            getAreaList: {
                ...state.getAreaList,
                isResultStatus: 2
            }
        }
    },
    [actionTypes.areaList.get_areaListForSelect_failed]: (state, action) => {
        const { payload: { failedMsg } } = action
        return {
            ...state,
            getAreaList: {
                ...state.getAreaList,
                isResultStatus: 4,
                failedMsg
            }
        }
    },
    [actionTypes.areaList.get_areaListForSelect_waiting]: (state, action) => {
        return {
            ...state,
            getAreaList: {
                ...state.getAreaList,
                isResultStatus: 1
            }
        }
    },
    [actionTypes.areaList.get_areaListForSelect_error]: (state, action) => {
        const { payload: { errorMsg } } = action
        return {
            ...state,
            getAreaList: {
                ...state.getAreaList,
                isResultStatus: 3,
                errorMsg
            }
        }
    }
}, initialState)