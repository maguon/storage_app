import * as actionTypes from './actionTypes'

export const changeSelectedTab = (param) => (dispatch) => {
    dispatch({ type: actionTypes.mainRootTypes.CHANGE_SELECTED_TAB, payload: { data: param } })

}