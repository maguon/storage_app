import React from 'react'
import { View, Text } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const ImportForCreateCarOp = () => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button transparent onPress={() => Actions.pop({ popNum: 3 })}>
                <Text style={{ color: '#fff' }}>完成</Text>
            </Button>
        </View>
    )
}

export default ImportForCreateCarOp