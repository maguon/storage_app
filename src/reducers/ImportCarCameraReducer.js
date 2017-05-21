import { handleActions } from 'redux-actions'
import * as actionTypes from '../actions/actionTypes'

const initialState = {
    isLoading: false,
    images: [],
    isError: false,
    ErrorMessage: {}
}

export default handleActions({
    [actionTypes.importCarCameraTypes.IMPORT_CAR_IMAGE_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            images: [...state.images, data.imageUrl],
            isLoading: data.isLoading
        }
    }
}, initialState)