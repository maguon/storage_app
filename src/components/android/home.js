import React,{Component } from 'react'
import { Text,View} from 'react-native'
import { connect} from 'react-redux'

export default class Home extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View><Text>new home</Text></View>
        )

    }

}