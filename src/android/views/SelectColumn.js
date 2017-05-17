import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import NavBar from '../components/Bar/NavBar'
import { Actions } from 'react-native-router-flux'

export default class SelectColumn extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavBar title={'选择道位'} />
                <ScrollView>
                    <Text onPress={() =>
                        Actions.pop({
                            popNum: 3,
                            /*refresh: {
                                makeId: this.props.makeId,
                                modelId: item.id,
                                makeName: this.props.makeName,
                                modelName: item.model_name
                            }*/
                        })}>SelectColumn</Text>
                </ScrollView>
            </View>
        )
    }

}