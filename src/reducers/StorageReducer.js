/**
 * Created by lingxue on 2017/4/17.
 */
import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    storages: [],
    isError: false,
    ErrorMessage: {}
}

export default handleActions({
    [actionTypes.storageTypes.GET_STORAGE_LIST_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading,
            storages: data.storages
        }
    },
    [actionTypes.storageTypes.GET_STORAGE_LIST_LOADING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading
        }
    }
}, initialState)