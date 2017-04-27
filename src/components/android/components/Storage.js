import React, { Component } from 'react'
import { View } from 'react-native'
import { Container,Text } from 'native-base'


export default class Storage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Container>
                <View>
                    <Text>
                        storage
                    </Text>
                </View>
            </Container>

        )

    }

}