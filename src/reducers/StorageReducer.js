/**
 * Created by lingxue on 2017/4/17.
 */
import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions/types';

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
            storages: data.storages.map(item => {
                item.pCount = item.col * item.row - item.balance
                item.parkings = []
                return item
            })
        }
    },
    [actionTypes.storageTypes.GET_PARKING_BY_ID]: (state, action) => {
        const { payload: { data, id } } = action
        return state.map(item => {
            if (item.id == id)
                item.parkings = data
            return item
        })
    },
    [actionTypes.storageTypes.LOADING]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            isLoading: data.isLoading
        }
    }
}, initialState)