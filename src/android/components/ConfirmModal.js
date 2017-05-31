import React, { Component } from 'react'
import { Text, View, Modal, TouchableHighlight, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

const ConfirmModal = ({ onPressOk, onPressCancel, isVisible,title }) => {

    return (
        <Modal
            animationType='fade'
            transparent
            visible={isVisible}
            onRequestClose={() => { }}
        >
            <View style={styles.modalStyle}>
                <View style={styles.subView}>
                    <Text style={styles.titleText}>
                        {title}
               </Text>
                    <View style={styles.horizontalLine} />
                    <TouchableHighlight underlayColor='transparent'
                        onPress={onPressOk}>
                        <Text style={styles.buttonText}>
                            确定
                   </Text>
                    </TouchableHighlight>
                    <View style={styles.horizontalLine} />
                    <TouchableHighlight underlayColor='transparent'
                        onPress={onPressCancel}>
                        <Text style={styles.buttonText}>
                            取消
                   </Text>
                    </TouchableHighlight>
                </View>
            </View>



        </Modal>
    )
}

var styles = StyleSheet.create({
    // modal的样式  
    modalStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    // modal上子View的样式  
    subView: {
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    // 标题  
    titleText: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // 水平的分割线  
    horizontalLine: {
        marginTop: 5,
        height: 0.5,
        backgroundColor: '#ccc',
    },
    buttonText: {
        fontSize: 16,
        color: '#00cade',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 5,
    },
})

export default ConfirmModal
