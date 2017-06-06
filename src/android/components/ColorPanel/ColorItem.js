import React, { Component } from 'react'
import { View, TouchableHighlight } from 'react-native'

const ColorItem = ({ color, selected = false }) => {
    //判断selectedColor是否为空，如果为空，显示无
    return <View
        style={{
            width: 20,
            height: 20,
            borderColor: `#dddddd`,
            borderWidth: 1,
            alignSelf: 'center',
            backgroundColor: `#${color}`,
            marginVertical: 2, marginHorizontal: 2
        }} />

}

export default ColorItem