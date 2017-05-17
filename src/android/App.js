import React, { Component, PropTypes } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../reducers'
import * as appAction from '../actions/AppAction'
import { Scene, Router, Actions } from 'react-native-router-flux'
import localStorage from '../util/LocalStorage'
import localStorageKey from '../util/LocalStorageKey'
import Welcome from './views/Welcome'
import Login from './views/Login'
import MainRoot from './views/MainRoot'
import Password from './views/Password'
import CarInfo from './views/CarInfo'
import ParkingView from './views/ParkingView'
import ErrView from './views/ErrView'
import ImportCar from './views/ImportCar'
import VinScanner from './components/VinScanner'
import ErrorView from './views/ErrorView'
import SearchCarList from './views/SearchCarList'
import SelectCarMake from './views/SelectCarMake'
import SelectCarModel from './views/SelectCarModel'
import SelectStorage from './views/SelectStorage'
import SelectRow from './views/SelectRow'
import SelectColumn from './views/SelectColumn'


class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { getAppVersion } = this.props;
        console.disableYellowBox = true;
        return (
            <Router>
                <Scene key="root">
                    <Scene key="welcome" component={Welcome} hideNavBar />
                    <Scene key="login" component={Login} hideNavBar />
                    <Scene key="main" initial={true} component={MainRoot} hideNavBar />
                    <Scene key="password" component={Password} hideNavBar />
                    <Scene key="carInfo" component={CarInfo} hideNavBar />
                    <Scene key="ParkingView" component={ParkingView} />
                    <Scene key="ErrView" component={ErrView} />
                    <Scene key="ImportCar" component={ImportCar} hideNavBar />
                    <Scene key="VinScanner" component={VinScanner} hideNavBar />
                    <Scene key="ErrorView" component={ErrorView} hideNavBar />
                    <Scene key="SearchCarList" component={SearchCarList} hideNavBar />
                    <Scene key="SelectCarMake" component={SelectCarMake} hideNavBar />
                    <Scene key="SelectCarModel" component={SelectCarModel} hideNavBar />
                    <Scene key="SelectStorage" component={SelectStorage} hideNavBar />
                    <Scene key="SelectRow" component={SelectRow} hideNavBar />
                    <Scene key="SelectColumn" component={SelectColumn} hideNavBar />
                </Scene>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        AppInfo: state.AppReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAppVersion: () => {
        dispatch(appAction.getAppLastVersion());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)