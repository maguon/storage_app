import { combineReducers } from 'redux'
import WelcomeReducer from './WelcomeReducer'
import LoginReducer from './LoginReducer'
import CarListReducer from './CarListReducer'
import CarMakeReducer from './CarMakeReducer'
import CarModelsReducer from './CarModelsReducer'
import StorageListReducer from './StorageListReducer'
import SelectRowReducer from './SelectRowReducer'
import ImporCarReducer from './ImporCarReducer'
import ImportCarCameraReducer from './ImportCarCameraReducer'
import PasswordReducer from './PasswordReducer'
import HomeReducer from './HomeReducer'
import CarInfoReducer from './CarInfoReducer'
import MainRootReducer from './MainRootReducer'
import SelectStorageReducer from './SelectStorageReducer'
import RecordListReducer from './RecordListReducer'
import SearchCarListReducer from './SearchCarListReducer'
import SelectStorageForCarListReducer from './SelectStorageForCarListReducer'

export default combineReducers({
    WelcomeReducer,
    LoginReducer,
    MainRootReducer,
    HomeReducer,
    PasswordReducer,
    CarListReducer,
    CarInfoReducer,
    CarMakeReducer,
    CarModelsReducer,
    ImporCarReducer,
    ImportCarCameraReducer,
    StorageListReducer,
    SelectRowReducer,
    SelectStorageReducer,
    RecordListReducer,
    SearchCarListReducer,
    SelectStorageForCarListReducer
})