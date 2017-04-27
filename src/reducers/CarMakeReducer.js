import { handleActions } from 'redux-actions'
import  * as actionTypes from '../actions/types'

const initialState = []


export default handleActions({
    [actionTypes.carMakeTypes.CAR_MAKES_SUCCESS]: (state, action) => {
        const { payload: { data } } = action
        console.log('data',data)
        console.log('state',state)
        // let tempState = {
        //     ...state
        // }


         return  data
    }
}, initialState)