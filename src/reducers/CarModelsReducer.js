import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    carModels: {
        isResultStatus: 0,
        isExecStatus: 0,
        errorMsg: '',
        failedMsg: '',
        data: {
            carModelList: []
        }
    }
}

export default handleActions({
    [actionTypes.carModelTypes.GET_CARMODELS_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading,
            carModels: data.carModels
        }
    }
}, initialState)