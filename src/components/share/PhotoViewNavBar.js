import React, { Component } from 'react'
import { Text, View, StatusBar, StyleSheet, Dimensions } from 'react-native'
import { Header, Title, Button, Icon, Right, Left, Body, Label } from 'native-base'
import { Actions } from 'react-native-router-flux'
import globalStyles, { styleColor } from '../../util/GlobalStyles'

const { width } = Dimensions.get('window')

const PhotoViewNavBar = props => {
    const { title, RightButton, LeftButton, parent } = props
    return (
        <View style={[styles.container, { width: width }]}>
            <StatusBar hidden={false} />
            <Header
                androidStatusBarColor={'#000'}
                style={[styles.header]}>
                {LeftButton && <Left style={styles.left}>
                    <LeftButton />
                </Left>}
                <Body style={styles.body}>
                    <Title style={[globalStyles.xlText, { color: '#fff' }]}>{title}</Title>
                </Body>
                <Right style={styles.right}>
                    {RightButton && <RightButton parent={parent} />}
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
        backgroundColor: '#000'
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    left: {
        flex: 1
    },
    body: {
        flex: 4
    },
    right: {
        flex: 2
    }
})

export default PhotoViewNavBar