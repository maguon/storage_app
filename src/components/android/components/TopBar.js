import React, { Component } from 'react'
import {  View } from 'react-native'
import { Container, Item, Header, Input,  Button, Left, Right, Icon } from 'native-base'

export default class TopBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <Header searchBar>

                    <Left style={{ flex: 1 }}>

                        <Button transparent>
                            <Icon name="camera" />
                        </Button>

                    </Left>
                    {/*<Body style={{flex:5}}>*/}
                    <View style={{flex:5}}>
                        <Item rounded>
                            <Input placeholder="Search" />
                            <Icon name="search" />
                        </Item>
                    </View>

                    {/*</Body>*/}

                    <Right style={{ flex: 1 }}>

                        <Button transparent>
                            <Icon Icon name="menu" />
                        </Button>

                    </Right>
                </Header>


            </View>
        )

    }

}