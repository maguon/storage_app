import React from 'react'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const HomeLeft = () => {
    return (
        <Button transparent onPress={Actions.pop}>
            <Icon name='ios-qr-scanner' />
        </Button>
    )
}

export default HomeLeft
