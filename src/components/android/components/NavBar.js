import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Header, Title, Button } from 'native-base'
import Icon from 'react-native-vector-icons/Entypo'
import { Actions } from 'react-native-router-flux'


const NavBar = ({ title }) => {
    return (
        <Header style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>
            <Title>{title}</Title>
            <View style={{ position: 'absolute', left: 0 }}>
                <Button transparent onPress={Actions.pop}>
                    <Icon name="chevron-left" size={30} color='#ffffff' />
                </Button>
            </View>
        </Header>
    )
}

export default NavBar



