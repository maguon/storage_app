import React, { Component, PropTypes } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from '../../reducers'
import * as appAction from '../../actions/AppAction'
import { Scene, Router, Actions } from 'react-native-router-flux'
import localStorage from '../../util/LocalStorage'
import localStorageKey from '../../util/LocalStorageKey'
import Welcome from './views/Welcome'
import Login from './views/Login'
import MainRoot from './MainRoot'
import Password from './views/Password'
import CarInfo from './layout/CarInfo'
import ParkingView from './views/ParkingView'
import ErrView from './views/ErrView'
import AddCar from './views/ImportCar'


class App extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { getAppVersion } = this.props;
        return (
            <Router>
                <Scene key="root">
                    <Scene key="welcome"  component={Welcome} hideNavBar={true} />
                    <Scene key="login" component={Login} hideNavBar={true} />
                    <Scene key="main"  initial={true}   component={MainRoot} hideNavBar={true} />
                    <Scene key="password" component={Password} hideNavBar={true} />
                    <Scene key="carInfo" component={CarInfo} hideNavBar={true} />
                    <Scene key="ParkingView" component={ParkingView} />
                    <Scene key="ErrView" component={ErrView}/>
                    <Scene key="addCar" component={AddCar}  hideNavBar/>
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