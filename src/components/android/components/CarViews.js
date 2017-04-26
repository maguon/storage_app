import React, { Component } from 'react'
import { Text, View, Button, Alert } from 'react-native'
import { connect } from 'react-redux'

import Car from './Car'

export default class CarViews extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        let { carlist } = this.props
        let cars = carlist.map((item) => {
            return <Car car={item} key={item.id} />
        })
        return (
            <View>
                {cars}

            </View>
        )
    }
}