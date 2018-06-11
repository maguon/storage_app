import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'


//views
import initReducer from './views/init/initReducer'
import loginReducer from './views/login/loginReducer'
import homeReducer from './views/home/homeReducer'
import entrustListReducer from './views/list/entrustList/entrustListReducer'
import makeListReducer from './views/list/makeList/makeListReducer'
import modelListReducer from './views/list/modelList/modelListReducer'
import personalCenterReducer from './views/personalCenter/personalCenterReducer'
import updatePasswordReducer from './views/updatePassword/updatePasswordReducer'
import keyCabinetListReducer from './views/keyCabinetList/keyCabinetListReducer'
import keyCabinetInfoReducer from './views/keyCabinetInfo/keyCabinetInfoReducer'
import keyCabinetAreaReducer from './views/keyCabinetArea/keyCabinetAreaReducer'
import keyInfoReducer from './views/keyInfo/keyInfoReducer'
import storageListReducer from './views/list/storageList/storageListReducer'
import rowListReducer from './views/list/rowList/RowListReducer'
import areaListReducer from './views/list/areaList/areaListReducer'
import carListReducer from './views/carList/carListReducer'
import addInfoForCreateCarReducer from './views/addInfoForCreateCar/addInfoForCreateCarReducer'
import keyCabinetRowFilterListReducer from './views/list/keyCabinetRowFilterList/keyCabinetRowFilterListReducer'
import addImageForCreateCarReducer from './views/addImageForCreateCar/addImageForCreateCarReducer'
import searchCarForCreateCarReducer from './views/searchCarForCreateCar/searchCarForCreateCarReducer'
import importForCreateCarReducer from './views/importForCreateCar/importForCreateCarReducer'


//components
import keyCabinetInfoHeaderReducer from './views/keyCabinetInfo/keyCabinetInfoHeader/keyCabinetInfoHeaderReducer'
import keyCabinetAreaHeaderReducer from './views/keyCabinetArea/keyCabinetAreaHeader/keyCabinetAreaHeaderReducer'
import carOpRecordReducer from './views/car/carOpRecord/carOpRecordReducer'
import carImageReducer from './views/car/carImage/carImageReducer'
import carInfoEditorReducer from './views/car/carInfoEditor/carInfoEditorReducer'
import carStorageOpReducer from './views/car/carStorageOp/carStorageOpReducer'

export default combineReducers({
    form: formReducer,
    //views
    initReducer,
    loginReducer,
    homeReducer,
    entrustListReducer,
    makeListReducer,
    modelListReducer,
    personalCenterReducer,
    updatePasswordReducer,
    keyCabinetListReducer,
    keyCabinetInfoReducer,
    keyCabinetAreaReducer,
    keyInfoReducer,
    storageListReducer,
    carListReducer,
    areaListReducer,
    rowListReducer,
    keyCabinetRowFilterListReducer,
    addInfoForCreateCarReducer,
    addImageForCreateCarReducer,
    searchCarForCreateCarReducer,
    importForCreateCarReducer,
    
    //components
    keyCabinetInfoHeaderReducer,
    keyCabinetAreaHeaderReducer,
    carOpRecordReducer,
    carImageReducer,
    carInfoEditorReducer,
    carStorageOpReducer
})