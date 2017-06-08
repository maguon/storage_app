import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class ParkingViewColumnHeaderItem extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.status != nextProps.status) {
            return true
        } else {
            return false
        }

    }

    render() {
        // console.log('ParkingViewColumnHeaderItemRender')
        let { title, itemWidth, itemHeight } = this.props
        let transparent = 0
        if (title % 2 == 0) {
            transparent += 0.1
        }

        return <View style={{
            width: itemWidth,
            height: itemHeight,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `rgba(0,0,0,${transparent})`,
            overflow: 'hidden'
        }}>
            <Text style={{ color: '#ffffff' }}>{title.toString()}</Text>
        </View>

    }
}