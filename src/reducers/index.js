import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import LoginReducer from './LoginReducer'
import CarReducer from './CarReducer'
import CarMakeReducer from './CarMakeReducer'
import StorageReducer from './StorageReducer'


export default combineReducers({
    AppReducer ,LoginReducer,CarReducer,CarMakeReducer
});