import React, { Component } from 'react'
import { Text, View, Modal, ProgressBarAndroid, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

const Loading = ({ isLoading = false }) => {
    
    return (
        <Modal
            animationType={"none"}
            transparent
            visible={isLoading}
            onRequestClose={() => { alert("Modal has been closed.") }}
        >
            <View style={styles.container}>
                <View>
                    <ProgressBarAndroid
                        indeterminate={true}
                        styleAttr='LargeInverse' />
                </View>
            </View>
        </Modal>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
})

export default Loading
