import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import LoginReducer from './LoginReducer'
import CarReducer from './CarReducer'



export default combineReducers({
    AppReducer ,LoginReducer,CarReducer
});