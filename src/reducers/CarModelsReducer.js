import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/types'

const initialState = {
    isLoading: false,
    carModels: [],
    isError: false,
    ErrorMessage: {}
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