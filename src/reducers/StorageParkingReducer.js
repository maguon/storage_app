import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions/types';

const initialState = {
    isLoading: false,
    storageParkings: [],
    isError: false,
    ErrorMessage: {}
}

export default handleActions({
    [actionTypes.storageParkingTypes.GET_STORAGE_PARKING_LIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading,
            storageParkings: data.storageParkings
        }
    },
    [actionTypes.storageParkingTypes.GET_STORAGE_PARKING_LIST_LOADING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading
        }
    }
}, initialState)