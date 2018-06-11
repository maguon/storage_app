//views
import * as init from './views/init/initAction'
import * as login from './views/login/loginAction'
import * as home from './views/home/homeAction'
import * as entrustList from './views/list/entrustList/entrustListAction'
import * as modelList from './views/list/modelList/modelListAction'
import * as makeList from './views/list/makeList/makeListAction'
import * as personalCenter from './views/personalCenter/personalCenterAction'
import * as updatePassword from './views/updatePassword/updatePasswordAction'
import * as keyCabinetList from './views/keyCabinetList/keyCabinetListAction'
import * as keyCabinetInfo from './views/keyCabinetInfo/keyCabinetInfoAction'
import * as keyCabinetArea from './views/keyCabinetArea/keyCabinetAreaAction'
import * as keyInfo from './views/keyInfo/keyInfoAction'
import * as storageList from './views/list/storageList/storageListAction'
import * as rowList from './views/list/rowList/RowListAction'
import * as keyCabinetRowFilterList from './views/list/keyCabinetRowFilterList/keyCabinetRowFilterListAction'
import * as areaList from './views/list/areaList/areaListAction'
import * as carList from './views/carList/carListAction'
import * as addImageForCreateCar from './views/addImageForCreateCar/addImageForCreateCarAction'
import * as addInfoForCreateCar from './views/addInfoForCreateCar/addInfoForCreateCarAction'
import * as searchCarForCreateCar from './views/searchCarForCreateCar/searchCarForCreateCarAction'
import * as importForCreateCar from './views/importForCreateCar/importForCreateCarAction'


//components
import * as keyCabinetInfoHeader from './views/keyCabinetInfo/keyCabinetInfoHeader/keyCabinetInfoHeaderAction'
import * as keyCabinetAreaHeader from './views/keyCabinetArea/keyCabinetAreaHeader/keyCabinetAreaHeaderAction'
import * as carImage from './views/car/carImage/carImageAction'
import * as carOpRecord from './views/car/carOpRecord/carOpRecordAction'
import * as carInfoEditor from './views/car/carInfoEditor/carInfoEditorAction'
import * as carStorageOp from './views/car/carStorageOp/carStorageOpAction'


export {
    //views
    init,
    login,
    home,
    entrustList,
    modelList,
    makeList,
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