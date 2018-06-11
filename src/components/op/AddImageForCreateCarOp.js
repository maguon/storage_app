import React from 'react'
import { View,Text } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const AddImageForCreateCarOp = () => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button transparent onPress={Actions.importForCreateCar}>
                <Text style={{color:'#fff'}}>下一步</Text>
            </Button>
        </View>
    )
}

export default AddImageForCreateCarOp