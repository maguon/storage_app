import React,{Component } from 'react'
import { View} from 'react-native'
import Record from './Record'
import { Text ,List} from 'native-base'

export default class RecordList extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View>
                <Text>工作记录</Text>
                <List>
                    <Record />
                </List>


                
            </View>
        )

    }

}