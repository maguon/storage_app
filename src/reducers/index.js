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
import PasswordReducer from './PasswordReducer'
import HomeReducer from './HomeReducer'
import CarInfoReducer from './CarInfoReducer'
import MainRootReducer from './MainRootReducer'


export default combineReducers({
    WelcomeReducer,
    LoginReducer,
    MainRootReducer,
    CarReducer,
    HomeReducer,
    CarInfoReducer,
    PasswordReducer,
    CarMakeReducer,
    StorageReducer,
    StorageDateReducer,
    StorageParkingReducer,
    RecordReducer,
    CarModelsReducer,
    ImporCarReducer,
    ImportCarCameraReducer
})