/**
 * Created by lingxue on 2017/4/17.
 */
import React, { Component, PropTypes } from 'react'
import { StatusBar, View, Navigator, KeyboardAwareScrollView } from 'react-native';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../../reducers';
import * as appAction from '../../actions/AppAction';
import localStorageKey from '../../util/LocalStorageKey';
import { Button, Body, Container, Content, Footer, FooterTab, Icon, Text } from 'native-base';

import Home from './views/Home'
import Setting from './Setting'
import CarList from './views/CarList'
import ParkingList from './views/ParkingList'
import TopBar from './components/TopBar'

class Main extends Component {

    renderSelectedTab() {
        switch (this.state.selectedTab) {
            case 'home':
                return (<Home></Home>);
                break;
            case 'carList':
                return (<CarList></CarList>);
                break;
            case 'parkingList':
                return (<ParkingList></ParkingList>);
                break;
            case 'setting':
                return (<Setting></Setting>);
                break;
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'parkingList',
        }

    }

    changeTab(selectedTab) {
        this.setState({ selectedTab })
    }


    render() {
        const { AppInfo } = this.props;
        const { selectedTab } = this.state;
        return (           
                <Container style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                    <TopBar />
                    <View style={{ flex: 1 }}>
                        {this.renderSelectedTab()}
                    </View>
                    <Footer rasied>
                        <FooterTab>
                            <Button
                                active={selectedTab === 'home'}
                                onPress={() => this.changeTab('home')}>
                                <Icon name={selectedTab === 'home' ? "ios-home" : "ios-home-outline"} />
                            </Button>
                            <Button
                                active={selectedTab === 'carList'}
                                onPress={() => this.changeTab('carList')}>
                                <Icon name={selectedTab === 'carList' ? "ios-car" : "ios-car-outline"} type="ionicons" />
                            </Button>
                            <Button
                                active={selectedTab === 'parkingList'}
                                onPress={() => this.changeTab('parkingList')}>
                                <Icon name={selectedTab === 'parkingList' ? "ios-car" : "ios-car-outline"} type="ionicons" />
                            </Button>
                            <Button
                                active={selectedTab === 'setting'}
                                onPress={() => this.changeTab('setting')}>
                                <Icon name={selectedTab === 'setting' ? "ios-settings" : "ios-settings-outline"} type="ionicons" />
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>      
        )
    }
}


const mapStateToProps = (state) => {
    return {
        AppInfo: state.AppReducer
    };
};

const mapDispatchToProps = (dispatch) => ({


});


export default connect(mapStateToProps, mapDispatchToProps)(Main);