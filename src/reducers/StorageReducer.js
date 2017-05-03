/**
 * Created by lingxue on 2017/4/17.
 */
import { handleActions } from 'redux-actions';
import * as actionTypes from '../actions/types';

const initialState = []

export default handleActions({
    [actionTypes.storageTypes.STORAGE_LIST_GET]: (state, action) => {
        const { payload: { data } } = action
        return data.map(item => {
            item.pCount = item.col * item.row - item.balance
            item.parkings=[]
            return item
        })
    },
    [actionTypes.storageTypes.GET_PARKING_BY_ID]: (state, action) => {
        const { payload: { data, id } } = action
        console.log('state',state)
        let s=state.map(item => {
            if (item.id == id)
                item.parkings = data
            return item
        })
        console.log('s',s)
        
        return s
    }
}, initialState)