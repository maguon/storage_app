/**
 * Created by lingxue on 2017/4/17.
 */
import { handleActions } from 'redux-actions';
import  * as actionTypes from '../actions/types';

const initialState = {
    storageList :[]
}

export default handleActions({
    [actionTypes.storageTypes.STORAGE_LIST_GET]: (state, action) => {
        const { payload: { data } } = action
        return {
            ...state,
            storageList:data
        }
    }
}, initialState)