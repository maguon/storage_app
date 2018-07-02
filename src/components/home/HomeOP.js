import React from 'react'
import { View } from 'react-native'
import { Button, Icon } from 'native-base'
import { Actions } from 'react-native-router-flux'

const HomeOP = () => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button transparent onPress={Actions.queryCar}>
            {/* <Button transparent onPress={Actions.pictureRecording}> */}
            {/* <Button transparent onPress={Actions.videoView}> */}
                <Icon name='ios-search' />
            </Button>
            <Button transparent onPress={Actions.addInfoForCreateCar}>
                <Icon name='ios-add' style={{ fontSize: 30 }} />
            </Button>
        </View>
    )
}

export default HomeOP