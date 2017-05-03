import { Button, Body, Container, Content, Footer, FooterTab, Icon, Text } from 'native-base'
import React, { Component } from 'react'

export default class CarInfo extends Component {
    constructor(props) {
        super(props)
    }

    changeTab(name){
        console.log(name)
    }

    render() {
        // console.log(this.props.car)
        return (

            <Footer rasied>
                        <FooterTab>
                            <Button
                                onPress={() => this.changeTab('home')}>
                                <Icon name={"ios-home-outline"} />
                                <Text>home</Text>
                            </Button>
                            <Button
                                onPress={() => this.changeTab('home')}>
                                <Icon name={"ios-home-outline"} />
                                <Text>home</Text>
                            </Button>
                            <Button
                                onPress={() => this.changeTab('home')}>
                                <Icon name={"ios-home-outline"} />
                                <Text>home</Text>
                            </Button>
                            <Button
                                onPress={() => this.changeTab('home')}>
                                <Icon name={"ios-home-outline"} />
                                <Text>home</Text>
                            </Button>
                            {/*<Button
                                active={selectedTab === 'home'}
                                onPress={() => this.changeTab('home')}>
                                <Icon name={selectedTab === 'home' ? "ios-home" : "ios-home-outline"} />
                                <Text>home</Text>
                            </Button>
                            <Button
                                active={selectedTab === 'carList'}
                                onPress={() => this.changeTab('carList')}>
                                <Icon name={selectedTab === 'carList' ? "ios-car" : "ios-car-outline"} type="ionicons" />
                                <Text>carList</Text>
                            </Button>
                            <Button
                                active={selectedTab === 'parkingList'}
                                onPress={() => this.changeTab('parkingList')}>
                                <Icon name={selectedTab === 'parkingList' ? "ios-car" : "ios-car-outline"} type="ionicons" />
                                <Text>parkingList</Text>
                            </Button>
                            <Button
                                active={selectedTab === 'setting'}
                                onPress={() => this.changeTab('setting')}>
                                <Icon name={selectedTab === 'setting' ? "ios-settings" : "ios-settings-outline"} type="ionicons" />
                                <Text>setting</Text>
                            </Button>*/}
                        </FooterTab>
                    </Footer>
      
        )
    }

}



