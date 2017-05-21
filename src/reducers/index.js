import { combineReducers } from 'redux'
import WelcomeReducer from './WelcomeReducer'
import LoginReducer from './LoginReducer'
import CarReducer from './CarReducer'
import CarMakeReducer from './CarMakeReducer'
import CarModelsReducer from './CarModelsReducer'
import StorageDateReducer from './StorageDateReducer'
import StorageReducer from './StorageReducer'
import StorageParkingReducer from './StorageParkingReducer'
import RecordReducer from './RecordReducer'
import ImporCarReducer from './ImporCarReducer'
import ImportCarCameraReducer from './ImportCarCameraReducer'


export default combineReducers({
    WelcomeReducer,
    LoginReducer,
    CarReducer,
    CarMakeReducer,
    StorageReducer,
    StorageDateReducer,
    StorageParkingReducer,
    RecordReducer,
    CarModelsReducer,
    ImporCarReducer,
    ImportCarCameraReducer
})