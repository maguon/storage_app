/**
 * Created by lingxue on 2017/4/17.
 */
import React, { Component, PropTypes } from 'react'
import { KeyboardAwareScrollView, View, Text, StyleSheet } from 'react-native'
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
            selectedTab: 'carList',
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

    changeBtnStyle(btnTag) {
        if (this.state.selectedTab == btnTag)
            return { backgroundColor: '#ffffff' }
        else
            return { backgroundColor: '#efefef' }
    }

    changeIconStyle(iconTag){
        if (this.state.selectedTab == iconTag)
            return { color: '#00bfd8' }
        else
            return { color: '#a8a8a8' }
    }

    render() {
        const { AppInfo } = this.props
        const { selectedTab } = this.state

        return (
            <Container style={{ flexDirection: "column", justifyContent: "flex-start" }}>
                {this.renderSelectedTab()}
                <Footer rasied >
                    <FooterTab>
                        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#ffffff', borderTopWidth: 1, borderColor: '#dedede' }}>
                            <View style={{ flex: 1, borderColor: '#dedede', borderRightWidth: 1 }}>
                                <Button full style={this.changeBtnStyle('home')}
                                    onPress={() => this.changeTab('home')}>
                                    <Icon name={selectedTab === 'home' ? "ios-home" : "ios-home-outline"}
                                        type="ionicons"
                                        style={this.changeIconStyle('home')} />
                                </Button>
                            </View>
                            <View style={{ flex: 1, borderColor: '#dedede', borderRightWidth: 1 }}>
                                <Button full style={this.changeBtnStyle('carList')}
                                    onPress={() => this.changeTab('carList')}>
                                    <Icon name={selectedTab === 'carList' ? "ios-car" : "ios-car-outline"}
                                        type="ionicons"
                                        style={this.changeIconStyle('carList')} />
                                </Button>
                            </View>
                            <View style={{ flex: 1, borderColor: '#dedede', borderRightWidth: 1 }}>
                                <Button full style={this.changeBtnStyle('parkingList')}
                                    onPress={() => this.changeTab('parkingList')}>
                                    <Icon name={selectedTab === 'parkingList' ? "ios-pin" : "ios-pin-outline"}
                                        type="ionicons"
                                        style={this.changeIconStyle('parkingList')} />
                                </Button>
                            </View>

                            <View style={{ flex: 1 }}>
                                <Button full style={this.changeBtnStyle('setting')}
                                    onPress={() => this.changeTab('setting')}>
                                    <Icon name={selectedTab === 'setting' ? "ios-settings" : "ios-settings-outline"}
                                        type="ionicons"
                                        style={this.changeIconStyle('setting')} />
                                </Button>
                            </View>
                        </View>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

// const styles = StyleSheet.create({
// })


const mapStateToProps = (state) => {
    return {
        AppInfo: state.AppReducer
    }
}

const mapDispatchToProps = (dispatch) => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(Main);