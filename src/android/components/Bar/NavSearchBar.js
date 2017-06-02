import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Header, Title, Button, Item, Input, Icon, Left, Right } from 'native-base'
//import Icon from 'react-native-vector-icons/Entypo'
import { Actions } from 'react-native-router-flux'


const NavSearchBar = ({ changeSearchVin, searchVin, searchCarList }) => {
    return (
        <Header searchBar style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>

            <Left style={{ flex: 1 }}>
                <Button transparent onPress={Actions.pop}>
                    <Icon name="ios-arrow-back" type="ionicons" />
                </Button>
            </Left>
            <View style={{ flex: 6, paddingTop: 10, paddingBottom: 10 }}>
                <Item rounded style={{ backgroundColor: 'rgba(255,255,255,0.4)', borderWidth: 0 }}>
                    <Input style={{ color: '#ffffff', fontSize: 14 }}
                        value={searchVin}
                        onChangeText={(text) => changeSearchVin(text)}
                    />
                    <Icon name="md-search"
                        type="ionicons"
                        style={{ color: '#ffffff' }}
                        onPress={searchCarList}
                    />
                </Item>
            </View>
            <Right style={{ flex: 1 }}>

            </Right>
        </Header>
    )
}

export default NavSearchBar



