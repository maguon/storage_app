import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, Dimensions } from 'react-native'
import { Header, Title, Button, Icon, Right, Left, Body, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../util/GlobalStyles'

const { width } = Dimensions.get('window')

const NavBar = props => {
    const { title, RightButton, LeftButton, parent, initParam } = props
    return (
        <View style={[styles.container, { width: width }]}>
            <StatusBar hidden={false} />
            <Header
                androidStatusBarColor={styleColor}
                style={[styles.header, globalStyles.styleBackgroundColor]}>
                {LeftButton && <Left style={{ flex: 1 }}>
                    <LeftButton parent={parent} />
                </Left>}
                {title && <Body style={styles.body}>
                    <Title style={[globalStyles.xlText, { color: '#fff' }]}>{title}</Title>
                </Body>}
                <Right style={{ flex: title ? 2 : 1 }}>
                    {RightButton && <RightButton parent={parent} initParam={initParam} />}
                </Right>
            </Header>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        backgroundColor: '#fff'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        flex: 4
    },

})

export default NavBar