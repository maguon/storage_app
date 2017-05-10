import React, { Component } from 'react'
import { Text, View ,Button} from 'react-native'
import { connect } from 'react-redux'

export default class CarCamera extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, marginHorizontal: 20 }}>
                <View style={{ width: (window.width - 50) / 2, height: 100, backgroundColor: '#999999', marginRight: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>图片</Text>
                </View>
                <View style={{ width: (window.width - 50) / 2, height: 100, backgroundColor: '#999999', marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>图片</Text>
                </View>
                <View style={{ width: (window.width - 50) / 2, height: 100, backgroundColor: '#999999', marginRight: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>图片</Text>
                </View>
                <View style={{ width: (window.width - 50) / 2, height: 100, backgroundColor: '#999999', marginBottom: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        style={{ borderRadius: 35, width: 70, height: 70, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00cade', alignSelf: 'center' }}
                        onPress={() => { }}
                        title='上传照片' >
                        <Icon name='camera' />
                    </Button>
                </View>
            </View>
        )
    }

}
