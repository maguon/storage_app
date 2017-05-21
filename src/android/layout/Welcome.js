import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Button } from 'native-base'

const window = Dimensions.get('window')
const ImageWidth = window.width
const ImageHeight = window.width / 9 * 16

const Welcome = ({ version, lastVersion, force_update, url, linkDownload, validateToken }) => {
    let versionArr = version.split('.')
    let lastVersionArr = lastVersion.split('.')
    let btnOnPress
    let btnText
    if ((versionArr[0] < lastVersionArr[0] || versionArr[1] < lastVersionArr[1] || versionArr[2] < lastVersionArr[2]) && force_update == 1) {
        btnOnPress = () => linkDownload(url)
        btnText = '下载更新版本'
    }
    else {
        btnOnPress = validateToken
        btnText = '立即体验'
    }
    return (
        <View style={styles.container}>
            <Image source={{ uri: 'welcom_back' }}
                style={styles.image}
            />
            <Button block
                onPress={btnOnPress}
                style={{ position: 'absolute', bottom: 50, width: window.width / 4 * 3, backgroundColor: 'rgba(255,255,255,0.73)', borderRadius: 25 }}>
                <Text style={styles.buttonTiltle}>{btnText}</Text>
            </Button>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: ImageWidth,
        height: ImageHeight
    },
    buttonTiltle: {
        fontSize: 18,
        color: '#0078a7'
    }
})

export default Welcome