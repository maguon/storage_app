import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Header, Subtitle, Icon, Body, Title, Left, Button, Right } from 'native-base'

export default class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Header style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade' }}>

                    <Title>Title</Title>

                <View style={{ position: 'absolute', left: 0 }}>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </View>
            </Header>
        )
    }

}