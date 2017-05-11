import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

export default class CarMake extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('CarMake-this.props.carMakes',this.props.carMakes)
        let carMakes=this.props.carMakes.map((item)=>{
           return <Text key={item.id}>{item.make_name}</Text>
        })
        console.log('CarMake-carMakes',carMakes)
        return (
            <View>
                <Text>CarMake</Text>
                {carMakes}
            </View>
        )
    }

}