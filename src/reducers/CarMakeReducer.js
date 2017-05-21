import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    carMakes: [],
    isError: false,
    ErrorMessage: {}
}

export default handleActions({
    [actionTypes.carMakeTypes.GET_CARMAKES_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading,
            carMakes: data.carMakes
        }
    }
}, initialState)