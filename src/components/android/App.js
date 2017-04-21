import React,{Component, PropTypes } from 'react'
import { Button,StyleSheet,Text,View} from 'react-native';
import { Provider ,connect} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../reducers';
import * as appAction from '../../actions/AppAction';
import {Scene, Router,Actions} from 'react-native-router-flux';
import localStorage from '../../util/LocalStorage';
import localStorageKey from '../../util/LocalStorageKey';
import Welcome from './Welcome';
import Login from './Login';
import MainRoot from './MainRoot';
import Password from './Password';

const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers);
class App extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){

    }
    render(){
        const { getAppVersion} = this.props;
        return (
            <Provider store={store}>

                <Router>
                    <Scene key="root">
                        <Scene key="welcome" component={Welcome}  hideNavBar={true}/>
                        <Scene key="login"  component={Login} initial={true}   hideNavBar={true}/>
                        <Scene key="main"  component={MainRoot}    hideNavBar={true}/>
                        <Scene key="password"  component={Password} hideNavBar={true}/>
                    </Scene>
                </Router>

            </Provider>
        )

    }

}

const mapStateToProps = (state) => {
    return {
        AppInfo: state.AppReducer
    };
};

const mapDispatchToProps = (dispatch) => ({
    getAppVersion :()=>{
        dispatch(appAction.getAppLastVersion());
    }
});


export default connect(mapStateToProps,mapDispatchToProps)(App);