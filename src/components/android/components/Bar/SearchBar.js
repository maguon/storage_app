import React, { Component } from 'react'
import { View } from 'react-native'
import { Item, Header, Input, Button, Left, Right, Icon } from 'native-base'

const SearchBar = ({viewStyle}) => {
    return (
        <Header searchBar style={viewStyle}>
            <Left style={{ flex: 1 }}>
                <Button transparent>
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
                <Button transparent>
                    <Icon Icon name="md-add" type="ionicons" />
                </Button>
            </Right>
        </Header>
    )
}

export default SearchBar

