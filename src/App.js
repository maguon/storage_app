import React, { Component } from 'react'
import { Scene, TabBar, Router, ActionConst, Actions, Switch, Reducer } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation'
import { StyleSheet } from 'react-native'



//components
import NavBar from './components/share/NavBar'
import LeftButton from './components/share/LeftButton'
import TabIcon from './components/share/TabIcon'
import HomeLeft from './components/home/HomeLeft'
import AddInfoForCreateCarLeftButton from './components/share/AddInfoForCreateCarLeftButton'
import HomeOP from './components/home/HomeOP'
import AddInfoForCreateCarOp from './components/op/AddInfoForCreateCarOp'
import AddImageForCreateCarOp from './components/op/AddImageForCreateCarOp'
import ImportForCreateCarOp from './components/op/ImportForCreateCarOp'
import KeyCabinetListOp from './views/keyCabinetList/KeyCabinetListOp'
import PhotoViewNavBar from './components/share/PhotoViewNavBar'
import NavSearchCarForCreateCarBar from './components/share/NavSearchCarForCreateCarBar'

//views
import Init from './views/init/Init'
import Login from './views/login/Login'
import Home from './views/home/Home'
import AddInfoForCreateCar from './views/addInfoForCreateCar/AddInfoForCreateCar'
import AddImageForCreateCar from './views/addImageForCreateCar/AddImageForCreateCar'
import SearchCarForCreateCar from './views/searchCarForCreateCar/SearchCarForCreateCar'
import QueryCar from './views/queryCar/QueryCar'
import EntrustList from './views/list/entrustList/EntrustList'
import MakeList from './views/list/makeList/MakeList'
import ModelList from './views/list/modelList/ModelList'
import AreaList from './views/list/areaList/AreaList'
import KeyCabinetListForSelect from './views/list/KeyCabinetListForSelect'
import KeyCabinetAreaList from './views/list/KeyCabinetAreaList'
import KeyCabinetRowList from './views/list/KeyCabinetRowList'
import KeyCabinetColList from './views/list/KeyCabinetColList'
import StorageList from './views/list/storageList/StorageList'
import KeyCabinetRowFilterList from './views/list/keyCabinetRowFilterList/KeyCabinetRowFilterList'
import KeyCabinetColFilterList from './views/list/KeyCabinetColFilterList'
import RowList from './views/list/rowList/RowList'
import ColList from './views/list/ColList'
import YearList from './views/list/YearList'
import LotList from './views/list/LotList'
import KeyOfCarList from './views/KeyOfCarList'
import CarList from './views/carList/CarList'
import Car from './views/car/Car'
import ImportForCreateCar from './views/importForCreateCar/ImportForCreateCar'
import CarImagePhotoView from './views/car/carImagePhotoView/CarImagePhotoView'
import AddImageForCreateCarPhotoView from './views/addImageForCreateCarPhotoView/AddImageForCreateCarPhotoView'

import ColorList from './views/list/ColorList'
import Setting from './views/Setting'
import PersonalCenter from './views/personalCenter/PersonalCenter'
import UpdatePassword from './views/updatePassword/UpdatePassword'
import KeyCabinetList from './views/keyCabinetList/KeyCabinetList'
import KeyCabinetArea from './views/keyCabinetArea/KeyCabinetArea'
import KeyCabinetInfo from './views/keyCabinetInfo/KeyCabinetInfo'
import KeyInfo from './views/keyInfo/KeyInfo'
import SearchKey from './views/searchKey/SearchKey'

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    }
})

const mapStateToProps = (state) => {
    return {
        loginReducer: state.loginReducer
    }
}

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    }
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? 0 : 56
        style.marginBottom = computedProps.hideTabBar ? 0 : 50
    }
    return style
}

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        Orientation.lockToPortrait()
    }

    render() {
        console.disableYellowBox = true
        return (
            <Router getSceneStyle={getSceneStyle}>
                <Scene key="root">
                    <Scene initial={true} key="init" component={Init} hideNavBar hideTabBar />
                    <Scene
                        key="mainRoot"
                        component={connect(mapStateToProps)(Switch)}
                        tabs={true}
                        type={ActionConst.RESET}
                        selector={props => {
                            const { user } = props.loginReducer.data
                            if (user.mobile
                                && user.token
                                && user.uid
                                && user.status
                                && user.type) {
                                return 'main'
                            } else {
                                return 'loginBlock'
                            }
                        }}
                    >
                        <Scene key="loginBlock" >
                            <Scene key="login" initial={true} component={Login} hideNavBar hideTabBar />
                            {/* <Scene key="retrievePassword" title='找回密码' component={RetrievePassword} hideTabBar hideNavBar={false} LeftButton={LeftButton} navBar={NavBar} />
                            <Scene key="qrCodeScreen" title='扫一扫' component={QRCodeScreen} hideNavBar={false} hideTabBar navBar={NavBar} /> */}
                        </Scene>
                        <Scene
                            key="main"
                            tabs={true}
                            tabBarStyle={styles.tabBarStyle}
                            tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
                            <Scene key="homeBlock" initial={true} icon={TabIcon} online='ios-home' outline='ios-home-outline' >
                                <Scene key="home"
                                    component={Home}
                                    initial={true}
                                    title='首页'
                                    navBar={NavBar}
                                    LeftButton={HomeLeft}
                                    RightButton={HomeOP} />
                                <Scene key='addInfoForCreateCar'
                                    title='新增车辆'
                                    component={AddInfoForCreateCar}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={AddInfoForCreateCarLeftButton}
                                    RightButton={AddInfoForCreateCarOp} />
                                <Scene key='addImageForCreateCar'
                                    title='添加照片'
                                    component={AddImageForCreateCar}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    RightButton={AddImageForCreateCarOp} />
                                <Scene key='searchCarForCreateCar'
                                    title='查询车辆'
                                    component={SearchCarForCreateCar}
                                    navBar={NavSearchCarForCreateCarBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='carList'
                                    title='车辆列表'
                                    component={CarList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='importForCreateCar'
                                    // initial={true}
                                    title='车辆入库'
                                    component={ImportForCreateCar}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton}
                                    RightButton={ImportForCreateCarOp} />
                                <Scene key='car'
                                    title='车辆详情'
                                    component={Car}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='queryCar'
                                    title='查询车辆'
                                    component={QueryCar}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='entrustListAtHome'
                                    title='委托方'
                                    component={EntrustList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='makeListAtHome'
                                    title='制造商'
                                    component={MakeList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='areaListAtHome'
                                    title='区'
                                    component={AreaList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='modelListAtHome'
                                    title='型号'
                                    component={ModelList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='colorListAtHome'
                                    title='颜色'
                                    component={ColorList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='storageListAtHome'
                                    title='仓库'
                                    component={StorageList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='rowListAtHome'
                                    title='排'
                                    component={RowList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='colListAtHome'
                                    title='列'
                                    component={ColList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='yearListAtHome'
                                    title='年份'
                                    component={YearList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='lotListAtHome'
                                    title='单元格'
                                    component={LotList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='carImagePhotoViewAtHome'
                                    title='照片'
                                    component={CarImagePhotoView}
                                    navBar={PhotoViewNavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='addImageForCreateCarPhotoView'
                                    title='照片'
                                    component={AddImageForCreateCarPhotoView}
                                    navBar={PhotoViewNavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='keyCabinetListForSelectAtHome'
                                    title='钥匙柜'
                                    component={KeyCabinetListForSelect}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='keyCabinetAreaListAtHome'
                                    title='扇区'
                                    component={KeyCabinetAreaList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='keyCabinetRowFilterListAtHome'
                                    title='排'
                                    component={KeyCabinetRowFilterList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='keyCabinetColFilterListAtHome'
                                    title='号'
                                    component={KeyCabinetColFilterList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                            </Scene>
                            <Scene key="keyBlock" icon={TabIcon} online='ios-key' outline='ios-key-outline'>
                                <Scene key="keyCabinetList"
                                    component={KeyCabinetList}
                                    initial={true}
                                    title='钥匙存放柜'
                                    RightButton={KeyCabinetListOp}
                                    navBar={NavBar} />
                                <Scene key="keyCabinetArea"
                                    component={KeyCabinetArea}
                                    title='钥匙存放扇区'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="keyCabinetInfo"
                                    component={KeyCabinetInfo}
                                    title='钥匙存放柜信息'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="keyInfo"
                                    component={KeyInfo}
                                    title='钥匙信息'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key="searchKey"
                                    component={SearchKey}
                                    title='钥匙搜索'
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='keyCabinetListForSelectAtKey'
                                    title='钥匙柜'
                                    component={KeyCabinetListForSelect}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='keyCabinetAreaListAtKey'
                                    title='扇区'
                                    component={KeyCabinetAreaList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='keyCabinetRowListAtKey'
                                    title='排'
                                    component={KeyCabinetRowList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='keyCabinetColListAtKey'
                                    title='号'
                                    component={KeyCabinetColList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                                <Scene key='keyOfCarListAtKey'
                                    title='钥匙列表'
                                    component={KeyOfCarList}
                                    navBar={NavBar}
                                    hideTabBar
                                    LeftButton={LeftButton} />
                            </Scene>
                            <Scene key="settingBlock" icon={TabIcon} online='ios-settings' outline='ios-settings-outline'>
                                <Scene key="setting"
                                    component={Setting}
                                    initial={true}
                                    title='设置'
                                    navBar={NavBar} />
                                <Scene key="personalCenter"
                                    component={PersonalCenter}
                                    title='个人中心'
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton} />
                                <Scene key="updatePassword"
                                    component={UpdatePassword}
                                    title='修改密码'
                                    hideTabBar
                                    navBar={NavBar}
                                    LeftButton={LeftButton} />
                            </Scene>
                        </Scene>
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

//ColorList
