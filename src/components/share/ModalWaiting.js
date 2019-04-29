import React, { Component } from 'react'
import {
    Text,
    View,
    Modal
} from 'react-native'
import { Container, Spinner } from 'native-base'
import globalStyles from '../../util/GlobalStyles'

const ModalWaiting = props => {
    const { visible, title } = props
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                alert("Modal has been closed.");
            }}>
            <Container style={{ backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
                {title && <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', padding: 15, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner color={'#fff'} style={{ paddingHorizontal: 20 }} />
                    <Text style={[globalStyles.midText, { color: '#fff' }]}>{title ? `${title}` : ''}</Text>
                </View>}
                {!title && <View style={{ backgroundColor: 'rgba(0,0,0,0.7)', borderRadius: 5 }}>
                    <Spinner color={'#fff'} style={{ paddingHorizontal: 20 }} />
                </View>}
            </Container>
        </Modal>
    )
}

export default ModalWaiting


