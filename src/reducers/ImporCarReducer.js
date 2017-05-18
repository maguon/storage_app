import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/types'

const initialState = {
    isLoading: false,
    carId: -1,
    isError: false,
    ErrorMessage: {}
}

export default handleActions({
    [actionTypes.imporCarTypes.IMPORT_CAR_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            carId: data.carId,
            isLoading: data.isLoading
        }
    }
}, initialState)