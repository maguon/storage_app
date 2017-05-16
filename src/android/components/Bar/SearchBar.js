import React, { Component } from 'react'
import { View, DrawerLayoutAndroid ,Text} from 'react-native'
import { Item, Header, Input, Button, Left, Right, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const SearchBar = ({ viewStyle }) => {
    return (
        /*<DrawerLayoutAndroid
            ref='VIN'
            drawerWidth={window.width / 2}
            drawerPosition={DrawerLayoutAndroid.positions.Right}
            renderNavigationView={() => { return (<View><Text>11111</Text></View>) }}>*/
            <Header searchBar style={viewStyle}>
                <Left style={{ flex: 1 }}>
                    <Button transparent onPress={() => { Actions.VinScanner() }}>
                        <Icon name="md-qr-scanner" type="ionicons" />
                    </Button>
                </Left>
                <View style={{ flex: 6, marginTop: 10, marginBottom: 10 }}>
                    <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.4)', borderWidth: 0 }}>
                        <Input />
                        <Icon name="md-search" type="ionicons" style={{ color: '#ffffff' }} />
                    </Item>
                </View>
                <Right style={{ flex: 1 }}>
                    <Button transparent onPress={() => { Actions.ImportCar() }}>
                        <Icon Icon name="md-add" type="ionicons" />
                    </Button>
                </Right>
            </Header>
        // </DrawerLayoutAndroid>
    )
}

export default SearchBar

