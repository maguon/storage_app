import React, { Component } from 'react'
import { View, Text, TouchableHighlight, Button } from 'react-native'
import { Icon } from 'native-base'

export default class ParkingViewItem extends Component {
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
        // console.log('item')
        let { itemWidth, itemHeight, row, col, top, left } = this.props
        let transparent = 0
        if (row % 2 == 0) {
            transparent += 0.1
        }
        if (col % 2 == 0) {
            transparent += 0.1
        }
        return (<View style={{
            width: itemWidth,
            height: itemHeight,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `rgba(0,0,0,${transparent})`,
            overflow: 'hidden',
            position: 'absolute',
            top: top,
            left: left
        }}
        >
            <Icon style={{ color: this.props.status ? '#00cade' : '#aaaaaa' }}
                name={this.props.status ? "ios-car" : "ios-car-outline"}
            />
        </View>
        )
    }
}