import React, { Component } from 'react'
import { View, TouchableHighlight } from 'react-native'
import ColorItem from './ColorItem'

const ColorChooser = ({ color, type }) => {
    return <TouchableHighlight
        underlayColor='rgba(0,0,0,0.1)'
        onPress={() => onSelectColor({ color })}>
        <ColorItem color={} />
    </TouchableHighlight>
}

export default ColorChooser