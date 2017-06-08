import React, { Component } from 'react'
import { View, TouchableHighlight } from 'react-native'
import * as colorList from '../../config/ColorList.json'
import ColorChooser from './ColorChooser'

export default class ColorPanel extends Component {
    constructor(props) {
        super(props)

        this.onSelectColor = this.onSelectColor.bind(this)
    }

    static propTypes = {
        onSelectColor: (color) => { }
    }

    onSelectColor(color) {
        this.props.onSelectColor(color)
    }

    render() {
        let colorChoosers = colorList.map(item => {
            return <ColorChooser
                color={item.colorId}
                onSelectColor={this.onSelectColor}
            />
        })

        return <View style={{ flex: 3, flexDirection: 'row', flexWrap: 'wrap' }}>
            {colorChoosers}
        </View>
    }

}

)