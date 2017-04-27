import React,{Component } from 'react'
import { Text,View} from 'react-native'
import Record from './Record'

export default class RecordList extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View>
                <Record></Record>
                <Text>recordlist</Text>
            </View>
        )

    }

}