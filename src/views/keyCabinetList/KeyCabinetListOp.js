import React from 'react'
import { View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const KeyCabinetListOp = () => {
    return (
        <Button transparent onPress={Actions.searchKey}>
            <Icon name='ios-search' />
        </Button>
    )
}

export default KeyCabinetListOp