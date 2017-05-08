/**
 * Created by lingxue on 2017/4/17.
 */
import React, { Component, PropTypes } from 'react'
import { KeyboardAwareScrollView, View } from 'react-native'
import { connect } from 'react-redux'
import localStorageKey from '../../util/LocalStorageKey'
import { Button, Container, Footer, FooterTab, Icon } from 'native-base'
import Home from './views/Home'
import Setting from './views/Setting'
import CarList from './views/CarList'
import ParkingList from './views/ParkingList'
import SearchBar from './components/SearchBar'


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home',
        }
    }
    renderSelectedTab() {
        switch (this.state.selectedTab) {
            case 'home':
                return (<Home></Home>)
                break
            case 'carList':
                return (<CarList></CarList>)
                break
            case 'parkingList':
                return (<ParkingList></ParkingList>)
                break
            case 'setting':
                return (<Setting></Setting>)
                break
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
    }
}

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(Main);