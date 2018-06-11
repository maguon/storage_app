//views
import * as init from './views/init/initActionTypes'
import * as login from './views/login/loginActionTypes'
import * as home from './views/home/homeActionTypes'
import * as entrustList from './views/list/entrustList/entrustListActionTypes'
import * as modelList from './views/list/modelList/modelListActionTypes'
import * as makeList from './views/list/makeList/makeListActionTypes'
import * as personalCenter from './views/personalCenter/personalCenterActionTypes'
import * as updatePassword from './views/updatePassword/updatePasswordActionTypes'
import * as keyCabinetList from './views/keyCabinetList/keyCabinetListActionTypes'
import * as keyCabinetInfo from './views/keyCabinetInfo/keyCabinetInfoActionTypes'
import * as keyCabinetArea from './views/keyCabinetArea/keyCabinetAreaActionTypes'
import * as keyInfo from './views/keyInfo/keyInfoActionTypes'
import * as storageList from './views/list/storageList/storageListActionTypes'
import * as areaList from './views/list/areaList/areaListActionTypes'
import * as rowList from './views/list/rowList/RowListActionTypes'
import * as carList from './views/carList/carListActionTypes'
import * as keyCabinetRowFilterList from './views/list/keyCabinetRowFilterList/keyCabinetRowFilterListActionTypes'
import * as addImageForCreateCar from './views/addImageForCreateCar/addImageForCreateCarActionTypes'
import * as addInfoForCreateCar from './views/addInfoForCreateCar/addInfoForCreateCarActionTypes'
import * as searchCarForCreateCar from './views/searchCarForCreateCar/searchCarForCreateCarTypes'
import * as importForCreateCar from './views/importForCreateCar/importForCreateCarActionTypes'

//components
import * as keyCabinetInfoHeader from './views/keyCabinetInfo/keyCabinetInfoHeader/keyCabinetInfoHeaderActionTypes'
import * as keyCabinetAreaHeader from './views/keyCabinetArea/keyCabinetAreaHeader/keyCabinetAreaHeaderActionTypes'
import * as carOpRecord from './views/car/carOpRecord/carOpRecordActionTypes'
import * as carImage from './views/car/carImage/carImageActionTypes'
import * as carInfoEditor from './views/car/carInfoEditor/carInfoEditorActionTypes'
import * as carStorageOp from './views/car/carStorageOp/carStorageOpActionTypes'


export {
    //views
    init,
    login,
    home,
    entrustList,
    makeList,
    modelList,
    personalCenter,
    updatePassword,
    keyCabinetList,
    keyCabinetInfo,
    keyCabinetArea,
    keyInfo,
    storageList,
    carList,
    areaList,
    rowList,
    keyCabinetRowFilterList,
    addImageForCreateCar,
    addInfoForCreateCar,
    searchCarForCreateCar,
    importForCreateCar,
    
    //components
    keyCabinetInfoHeader,
    keyCabinetAreaHeader,
    carOpRecord,
    carImage,
    carInfoEditor,
    carStorageOp
}