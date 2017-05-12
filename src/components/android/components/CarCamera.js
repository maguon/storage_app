import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import { Button, Icon } from 'native-base'


const window = Dimensions.get('window')
let ImageWidth = (window.width - 50) / 2
let ImageHeight = ImageWidth / 16 * 9

const CarCamera = () => {
    return (
        <View style={styles.container}>
            <View style={[{ marginRight: 10, }, styles.item]}>
                <Text>图片</Text>
            </View>
            <View style={styles.item}>
                <Text>图片</Text>
            </View>
            <View style={[{ flexDirection: 'row' }, styles.item]}>
                <Button
                    style={{
                        borderRadius: 35,
                        width: 70,
                        height: 70,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00cade',
                        alignSelf: 'center'
                    }}
                    onPress={() => { }}
                    title='上传照片' >
                    <Icon name='camera' />
                </Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        marginHorizontal: 20
    },
    item: {
        width: ImageWidth,
        height: ImageHeight,
        backgroundColor: '#999999',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default CarCamera

